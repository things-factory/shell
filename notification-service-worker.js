self.addEventListener('push', async function(event) {
  var text = await event.data.text()
  event.waitUntil(
    self.registration.showNotification(text, {
      body: 'Push Notification Subscription Management'
    })
  )
})

self.addEventListener('pushsubscriptionchange', function(event) {
  console.log('Subscription expired')
  event.waitUntil(
    self.registration.pushManager.subscribe({ userVisibleOnly: true }).then(function(subscription) {
      console.log('Subscribed after expiration', subscription.endpoint)
      return fetch('register', {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          endpoint: subscription.endpoint
        })
      })
    })
  )
})
