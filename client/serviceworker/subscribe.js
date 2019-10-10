import { urlBase64ToUint8Array } from './url-base64-to-uint8-array'
import { unsubscribe } from './unsubscribe'

export async function subscribe() {
  try {
    var registration = await navigator.serviceWorker.ready
    var subscription = await registration.pushManager.getSubscription()

    if (subscription) {
      unsubscribe()
    }

    const response = await fetch('./vapidPublicKey')
    const vapidPublicKey = await response.text()
    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey)

    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey
    })

    if (!subscription) return false

    console.log('Subscribed', subscription.endpoint)

    await fetch('register', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        subscription
      })
    })

    return true
  } catch (e) {
    return false
  }
}
