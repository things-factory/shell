/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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
          var { type, service, params } = e.data

          switch (type) {
            case 'screencast-service-loaded':
              this.browseThingsFactoryDevices()
              break
            case 'screencast-service-selected':
              this.advertisementForConnect(service, params)
              break
          }
        })
      },
      () => {
        console.log('no WIFI')
      }
    )

    this.zeroconf = cordova.plugins.zeroconf

    // this.zeroconf.registerAddressFamily = 'ipv4' // or 'ipv6' ('any' by default)
    // this.zeroconf.watchAddressFamily = 'ipv4' // or 'ipv6' ('any' by default)
  },

  browseThingsFactoryDevices: function() {
    if (this._serviceWatching) return
    this.zeroconf.watch(`_thingsfactory._tcp.`, 'local.', result => {
      if (!this._serviceWatching) this._serviceWatching = true

      var action = result.action
      var service = result.service
      var message = {
        service
      }
      if (action == 'added') {
        console.log('service added', service)
        message.type = 'added'
      } else if (action == 'resolved') {
        console.log('service resolved', service)
        message.type = 'changed'
        // if (service.port == 1008 && service.txtRecord) {
        //   var data = service.txtRecord
        //   if (data.url && data.token) {
        //     cordova.InAppBrowser.open(
        //       `https://deadpool.hatiolab.com${data.url}?token=${data.token}`,
        //       '_self',
        //       'location=no,zoom=no'
        //     )
        //   }
        // }
        /* service : {
        'domain' : 'local.',
        'type' : '_http._tcp.',
        'name': 'Becvert\'s iPad',
        'port' : 80,
        'hostname' : 'ipad-of-becvert.local',
        'ipv4Addresses' : [ '192.168.1.125' ],
        'ipv6Addresses' : [ '2001:0:5ef5:79fb:10cb:1dbf:3f57:feb0' ],
        'txtRecord' : {
            'foo' : 'bar'
        } */
      } else {
        console.log('service removed', service)
        message.type = 'removed'
      }

      this.iab.executeScript({
        code: `window.postMessage(${JSON.stringify(message)})`
      })
    })
  },

  advertisementForConnect: function(service, params) {
    var myIp = this.ipInformation.ip
    var { txtRecord: rec } = service
    var { token, url } = params

    if (!rec) return

    var splitToken = token.split('.')

    var ipAddress = rec['ip-address']

    var txtRecord = {
      // 'ip-address': myIp,
      // uuid: device.uuid
      ta: splitToken[0],
      tb: splitToken[1],
      tc: splitToken[2],
      url
    }

    this.zeroconf.register(
      `_${ipAddress.replace(/\./g, '')}._udp.`,
      'local.',
      `things-factory-${myIp}`,
      1008,
      txtRecord,
      result => {
        console.log('Service registered', result.service)
      }
    )
  }
}

app.initialize()
