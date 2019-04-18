var os = 'Unknown OS'

if (navigator.appVersion.indexOf('Win') != -1) os = 'Windows'
else if (navigator.appVersion.indexOf('Macintosh') != -1) os = 'Mac'
else if (navigator.appVersion.indexOf('Android') != -1) os = 'Android'
else if (navigator.appVersion.indexOf('iPad') != -1) os = 'iOS'
else if (navigator.appVersion.indexOf('iPhone') != -1) os = 'iOS'

var mobile = os === 'iOS' || os === 'Android'

export function getOS() {
  return os
}

export function isMobileDevice() {
  return mobile
}

export function isIOS() {
  return os === 'iOS'
}
