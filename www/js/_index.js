import { natives } from './native-importer.import'
import debounce from 'lodash/debounce'

var app = {
  onpremiseServerInfos: {},
  needSelectorOpen: false,

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
    this.zeroconf = cordova.plugins.zeroconf
    this.zeroconf.watchAddressFamily = 'ipv4'

    this.serverSelectButton = document.getElementById('server-select-button')
    this.serverSelectButton.addEventListener('click', e => {
      e.stopPropagation()
      this.showServerSelector()
    })

    document.getElementById('main').addEventListener('click', () => {
      this.currentServerName = localStorage.getItem('current_server')
      if (!this.currentServerName) this.showServerSelector()
      else this.openThingsFactory(this.currentServerName)
    })

    networkinterface.getWiFiIPAddress(
      ipInformation => {
        this.ipInformation = ipInformation
        this.browseOnpremiseServers()

        this.currentServerName = localStorage.getItem('current_server')
        if (!this.currentServerName) this.needSelectorOpen = true
        else {
          this._serverInfoFindTimer = setTimeout(() => {
            this.showServerSelector()
          }, 3 * 1000)
        }
      },
      () => {
        console.log('no WIFI')
      }
    )
  },

  browseOnpremiseServers: function() {
    var debounced = debounce(this.showServerSelector, 100).bind(this)
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

      if (this.needSelectorOpen) debounced()
      else if (this.currentServerName && service.name == this.currentServerName) {
        if (this._serverInfoFindTimer) clearTimeout(this._serverInfoFindTimer)
        this.openThingsFactory(this.currentServerName)
      }
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

    if (serverList.length == 0) {
      this.needSelectorOpen = true
      return
    }

    //config here... (see config for each screenshot below to get desired results)
    var config = {
      title: 'Choose server',
      items: [[[...serverList]]],
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
        this.openThingsFactory(serverList[result[0].index].description)
      },
      () => {
        console.log('Canceled')
      }
    )

    this.needSelectorOpen = false
  },

  openThingsFactory: function(currentServerName) {
    if (!currentServerName) return
    var currentServer = this.onpremiseServerInfos[currentServerName]
    if (!currentServer) {
      this.showServerSelector()
      return
    }

    this.iab = cordova.InAppBrowser.open(`http://${currentServer}`, '_self', 'location=no,zoom=no')
    this.iab.addEventListener('loadstop', e => {
      localStorage.setItem('current_server', currentServerName)
      this.serverSelectButton.innerText = currentServerName
      console.log('loadstop', e)
    })
    this.iab.addEventListener('exit', e => {
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
