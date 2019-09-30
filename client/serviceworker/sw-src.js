workbox.core.skipWaiting()
workbox.core.clientsClaim()

workbox.routing.registerRoute(
  new RegExp('.(?:png|jpe?g|svg|gif)'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'images-cache'
  })
)

workbox.routing.registerRoute(
  new RegExp('^https://fonts.gstatic.com/'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-cache'
  })
)

self.addEventListener('push', event => {
  const title = 'Reimagining Logistics with OPAONE'
  var message

  try {
    message = event.data.json()
  } catch (e) {
    message = {
      body: event.data.text()
    }
  }

  const options = {
    body: message.body,
    icon: 'assets/manifest/icon-128x128.png',
    badge: message.badge,
    data: message
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', event => {
  event.notification.close()

  var data = event.notification.data
  var { url } = data

  event.waitUntil(clients.openWindow(url))
})

workbox.precaching.precacheAndRoute(self.__precacheManifest)
