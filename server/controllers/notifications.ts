const webPush = require('web-push')

// VAPID keys should only be generated only once.
const vapidKeys = webPush.generateVAPIDKeys()

// webpush.setGCMAPIKey('AIzaSyBL961BMJrB40CaN77pc5STNxUQF6z083I')
webPush.setVapidDetails('https://kimeda.opa-x.com/', vapidKeys.publicKey, vapidKeys.privateKey)

const subscriptions = {}

// This is the same output of calling JSON.stringify on a PushSubscription
// const pushSubscription = {
//   endpoint: '.....',
//   keys: {
//     auth: '.....',
//     p256dh: '.....'
//   }
// }

const pushInterval = 10

export function sendNotification(message) {
  Object.values(subscriptions).forEach(subscription => {
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
      delete subscriptions[subscription.endpoint]
    })
}

// setInterval(function() {
//   Object.values(subscriptions).forEach(sendNotification)
// }, pushInterval * 1000)

export function getVapidPublicKey() {
  return vapidKeys.publicKey
}

export function register(req) {
  var subscription = req.body.subscription
  if (!subscriptions[subscription.endpoint]) {
    console.log('Subscription registered ' + subscription.endpoint)
    subscriptions[subscription.endpoint] = subscription
  }
}

export function unregister(req) {
  var subscription = req.body.subscription
  if (subscriptions[subscription.endpoint]) {
    console.log('Subscription unregistered ' + subscription.endpoint)
    delete subscriptions[subscription.endpoint]
  }
}
