import { skipWaiting, clientsClaim } from 'workbox-core'
import * as navigationPreload from 'workbox-navigation-preload'
import * as precaching from 'workbox-precaching'
import * as routing from 'workbox-routing'
import * as strategies from 'workbox-strategies'

skipWaiting()
clientsClaim()

navigationPreload.enable()

var precacheManifest = self.__WB_MANIFEST
precaching.precacheAndRoute(
  precacheManifest.filter(precache => {
    let url = precache.url
    return !/^\/index\.html/.test(url)
  })
)
precaching.cleanupOutdatedCaches()

routing.registerRoute(
  new RegExp('.(?:png|jpe?g|svg|gif)'),
  new strategies.StaleWhileRevalidate({
    cacheName: 'images-cache'
  })
)

routing.registerRoute(
  new RegExp('^https://fonts.gstatic.com/'),
  new strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-cache'
  })
)

routing.registerRoute(
  new RegExp('^[^.]+$'),
  new strategies.NetworkFirst({
    cacheName: 'api'
  })
)

self.addEventListener('activate', e => {
  self.clients.matchAll().then(clientArr => {
    clientArr.forEach(client => {
      client.postMessage('show-reload-snackbar')
    })
  })
})

self.addEventListener('push', event => {
  if (!event.data) return // for check endpoint alive

  var message

  try {
    message = event.data.json()
  } catch (e) {
    message = {
      body: event.data.text()
    }
  }

  const title = message.title || 'Reimagining Logistics with OPAONE'

  const options = {
    body: message.body,
    icon: '/assets/manifest/icon-128x128.png',
    badge: '/assets/manifest/icon-128x128.png',
    data: message,
    requireInteraction: message.requireInteraction
    // actions: [{ action: 'like', title: 'Like' }, { action: 'reply', title: 'Reply' }]
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', event => {
  event.notification.close()

  var action = event.action

  var data = event.notification.data
  var { url } = data

  var promiseChain
  switch (action) {
    default:
      promiseChain = openOrNavigateToUrlAndFocus(url)
  }

  event.waitUntil(promiseChain)
})

function openOrNavigateToUrlAndFocus(url) {
  var urlToOpen = new URL(url)

  return clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true
    })
    .then(windowClients => {
      let matchingClient = null

      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i]
        var windowClientUrl = new URL(windowClient.url)
        if (windowClientUrl.origin === urlToOpen.origin) {
          matchingClient = windowClient
          break
        }
      }

      try {
        if (matchingClient) {
          return matchingClient.navigate(urlToOpen.href).then(matchingClient => {
            matchingClient.focus()
          })
        } else {
          return clients.openWindow(url)
        }
      } catch (e) {
        return clients.openWindow(url)
      }
    })
}
