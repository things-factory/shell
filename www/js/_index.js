import { natives } from './native-importer.import'

var app = {
  // Application Constructor
  initialize: function() {
    this.onpremiseServerInfos = {}
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function() {
    window.open = window.open = cordova.InAppBrowser.open
    this.zeroconf = cordova.plugins.zeroconf
    this.zeroconf.watchAddressFamily = 'ipv4'

    networkinterface.getWiFiIPAddress(
      ipInformation => {
        this.ipInformation = ipInformation

        var currentServer = localStorage.getItem('current_server')
        if (!currentServer) {
          this.browseOnpremiseServers()
          this.showServerSelector()
        } else this.openThingsFactory(currentServer)
      },
      () => {
        console.log('no WIFI')
      }
    )
  },

  browseOnpremiseServers: function() {
    this.zeroconf.watch(`_tfserver._tcp.`, 'local.', result => {
      var action = result.action
      var service = result.service

      switch (action) {
        case 'added':
          break

        case 'resolved':
          this.onpremiseServerInfos[service.name] = service.txtRecord.address
          break

        default:
          delete this.onpremiseServerInfos[service.name]
          break
      }

      if (!this.connected && Object.keys(this.onpremiseServerInfos).length > 0) this.showServerSelector()
    })
  },

  showServerSelector: function() {
    SelectorCordovaPlugin.hideSelector()
    var serverList = []

    for (var key in this.onpremiseServerInfos) {
      var serverInfo = this.onpremiseServerInfos[key]
      serverList.push({
        description: key,
        value: serverInfo
      })
    }

    if (serverList.length == 0) return

    //config here... (see config for each screenshot below to get desired results)
    var config = {
      title: 'Choose server',
      items: [[[...serverList]]],
      // defaultItems: {
      //   //which items to display, example [{"0" :"2"},{"1" :"Apple"}] (index:value}
      // },
      displayKey: 'description',
      positiveButtonText: 'OK',
      negativeButtonText: 'Cancel',
      theme: 'dark' //lighter or darker theme, not available on iOS yet
      // wrapWheelText: false, //wrap the wheel for infinite scroll, not available on iOS
    }

    //do something useful with the result:
    SelectorCordovaPlugin.showSelector(
      config,
      result => {
        this.openThingsFactory(serverList[result[0].index].value)
      },
      () => {
        console.log('Canceled')
      }
    )
  },

  openThingsFactory: function(currentServer) {
    if (!currentServer) return

    localStorage.setItem('current_server', currentServer)

    this.iab = cordova.InAppBrowser.open(`http://${currentServer}`, '_self', 'location=no,zoom=no')
    this.iab.addEventListener('loadstop', e => {
      this.connected = true
      console.log('loadstop', e)
    })
    this.iab.addEventListener('exit', e => {
      this.connected = false
      this.showServerSelector()
      console.log('exit', e)
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
  }
}

app.initialize()
