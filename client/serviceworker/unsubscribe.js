export async function unsubscribe() {
  var registration = await navigator.serviceWorker.ready
  var subscription = await registration.pushManager.getSubscription()
  if (!subscription) return false

  await subscription.unsubscribe()
  await fetch('/unregister', {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      subscription: subscription
    })
  })

  return true
}
