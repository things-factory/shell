import { urlBase64ToUint8Array } from './url-base64-to-uint8-array'

export async function subscribe(userInfo) {
  try {
    var registration = await navigator.serviceWorker.ready
    var subscription = await registration.pushManager.getSubscription()

    if (!subscription) {
      const response = await fetch('/vapidPublicKey')
      const vapidPublicKey = await response.text()
      const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey)

      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey
      })
    }

    if (!subscription) return false
    if (!userInfo) return
    if (!userInfo.id) return

    console.log('Subscribed', subscription.endpoint)

    await fetch('/register', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        subscription,
        user: userInfo.id
      })
    })

    return true
  } catch (e) {
    return false
  }
}
