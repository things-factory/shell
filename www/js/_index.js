import { natives } from './native-importer.import'

var app = {
  // Application Constructor
  initialize: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function() {
    window.open = window.open = cordova.InAppBrowser.open

    networkinterface.getWiFiIPAddress(
      ipInformation => {
        this.ipInformation = ipInformation

        this.iab = cordova.InAppBrowser.open(`http://192.168.1.27:3000`, '_self', 'location=no,zoom=no')
        this.iab.addEventListener('loadstop', e => {
          console.log('loadstop', e)
        })
        this.iab.addEventListener('message', e => {
          if (!e || !e.data) return
          var { type, detail } = e.data

          natives.forEach(native => {
            native.onMessage &&
              native.onMessage({
                iab: this.iab,
                type,
                detail
              })
          })
        })
      },
      () => {
        console.log('no WIFI')
      }
    )
  }
}

app.initialize()
