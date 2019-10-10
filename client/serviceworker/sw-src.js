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

  if (!event.data) return // for check endpoint alive

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

  var urlToOpen = new URL(url)

  const promiseChain = clients
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

      if (matchingClient) {
        matchingClient.focus()
        return matchingClient.navigate(urlToOpen.href)
      } else {
        return clients.openWindow(url)
      }
    })

  event.waitUntil(promiseChain)
})

workbox.precaching.precacheAndRoute(self.__precacheManifest)
