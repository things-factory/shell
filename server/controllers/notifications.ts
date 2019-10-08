import { debounce } from 'lodash'
import fetch from 'node-fetch'
import { getRepository } from 'typeorm'
import { URL } from 'url'
import { UserNotification } from '../entities'

const webPush = require('web-push')

// VAPID keys should only be generated only once.
const vapidKeys = webPush.generateVAPIDKeys()

// webpush.setGCMAPIKey('AIzaSyBL961BMJrB40CaN77pc5STNxUQF6z083I')
webPush.setVapidDetails('https://kimeda.opa-x.com/', vapidKeys.publicKey, vapidKeys.privateKey)

const USER_SUBSCIPTIONS_MAP = {}

// This is the same output of calling JSON.stringify on a PushSubscription
// const pushSubscription = {
//   endpoint: '.....',
//   keys: {
//     auth: '.....',
//     p256dh: '.....'
//   }
// }

async function initialize() {
  var repo = getRepository('UserNotification')
  var userNotifications = await repo.find()

  if (!userNotifications.length) return

  userNotifications.forEach((un: UserNotification) => {
    var subscriptions = USER_SUBSCIPTIONS_MAP[un.userId]
    if (!subscriptions) subscriptions = USER_SUBSCIPTIONS_MAP[un.userId] = []
    subscriptions.push(JSON.parse(un.subscription))
  })
}

export function sendNotification({ receiver, message }) {
  var subscriptions = USER_SUBSCIPTIONS_MAP[receiver]
  if (!subscriptions) return

  subscriptions.forEach(subscription => {
    sendNotificationTo(subscription, message)
  })
}

function sendNotificationTo(subscription, message) {
  webPush
    .sendNotification(subscription, message)
    .then(function() {
      console.log(message, 'Push Application Server - Notification sent to ' + subscription.endpoint)
    })
    .catch(function() {
      console.log('ERROR in sending Notification, endpoint removed ' + subscription.endpoint)
      unregisterSubscription({
        subscription
      })
    })
}

export function getVapidPublicKey() {
  return vapidKeys.publicKey
}

export async function register({ request: req }) {
  var subscription = req.body.subscription

  if (!subscription) return false

  var authCheckURL = new URL('/authcheck', req.URL).toString()

  var response = await fetch(authCheckURL, {
    headers: {
      cookie: req.headers.cookie
    }
  })

  var userInfo = await response.json()

  if (!userInfo) return false

  var userId = userInfo.user.id

  registerSubscription({
    userId,
    subscription
  })
}

export function unregister(req) {
  var subscription = req.body.subscription
  unregisterSubscription({
    subscription
  })
}

function registerSubscription({ userId, subscription }) {
  var userSubscriptions = USER_SUBSCIPTIONS_MAP[userId]
  if (!userSubscriptions) userSubscriptions = USER_SUBSCIPTIONS_MAP[userId] = []

  userSubscriptions.push(subscription)

  debouncedSaveSubscriptions()

  return true
}

function unregisterSubscription({ subscription }) {
  var empties = []
  for (var userId in USER_SUBSCIPTIONS_MAP) {
    var userSubscriptions = USER_SUBSCIPTIONS_MAP[userId]

    var subscriptionIdx = userSubscriptions.findIndex(s => {
      return s.endpoint == subscription.endpoint
    })

    if (subscriptionIdx > -1) userSubscriptions.splice(subscriptionIdx, 1)
    if (userSubscriptions.length == 0) empties.push(userId)
  }

  empties.forEach(userId => {
    delete USER_SUBSCIPTIONS_MAP[userId]
  })

  debouncedSaveSubscriptions()

  return true
}

async function saveSubscriptions() {
  var repo = getRepository('UserNotification')

  var userNotifications = []

  for (var userId in USER_SUBSCIPTIONS_MAP) {
    var subscriptions = USER_SUBSCIPTIONS_MAP[userId]
    subscriptions.forEach(subscription => {
      userNotifications.push({
        userId,
        subscription: JSON.stringify(subscription)
      })
    })
  }

  if (userNotifications.length) {
    await repo.clear()
    repo.save(userNotifications)
  }
}

var debouncedSaveSubscriptions = debounce(saveSubscriptions, 100)

// TODO: initialize 시점...
process.on('bootstrap-module-middleware' as any, () => {
  initialize()
})
