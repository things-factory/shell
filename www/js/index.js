/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./www/js/app-importer.import

var modules = [];

  
  
// CONCATENATED MODULE: ./www/js/_index.js
// const { orderedModuleNames } = require('@things-factory/env')
// const moduleConfigMap = {}
// const path = require('path')
// const fs = require('fs')

// var modulePath = path.resolve(process.cwd(), 'node_modules')

// try {
//   const thingsdir = path.resolve(modulePath, '@things-factory')
//   const folders = fs.readdirSync(thingsdir)

//   console.log(thingsdir, folders)

//   /**
//    * package.json의 things-factory 속성이 truthy 인 경우를 필터링한다.
//    */
//   folders.forEach(folder => {
//     try {
//       const pkg = require(path.resolve(thingsdir, folder, 'package.json'))

//       if (pkg['things-factory']) {
//         moduleConfigMap[pkg.name] = {
//           pkg,
//           config: path.resolve(thingsdir, folder, 'things-factory.config.js')
//         }
//       }
//     } catch (e) {
//       console.warn(e)
//     }
//   })

//   console.log(moduleConfigMap)
// } catch (e) {
//   console.warn('[things-factory-module-loader]', '@things-factory module folder not found.')
// }


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

          switch (type) {
            case 'scan-barcode':
              this.scanBarcode()
              break
          }

          /* Cannot get final name for export "default" in "./www/js/app-importer.import" (known exports: modules, known reexports: ) */ undefined.forEach(app => {
            app.onMessage && app.onMessage(type, detail)
          })
        })
      },
      () => {
        console.log('no WIFI')
      }
    )
  },

  scanBarcode: function() {
    var iab = this.iab
    cordova.plugins.barcodeScanner.scan(
      function(result) {
        iab.executeScript({
          code: `
          window.dispatchEvent(
            new CustomEvent('barcode-respond', {
              detail: "${result.text}"
            })
          );
          `
        })
      },
      function(error) {
        alert('Scanning failed: ' + error)
      },
      {
        showFlipCameraButton: true, // iOS and Android
        showTorchButton: true, // iOS and Android
        torchOn: true, // Android, launch with the torch switched on (if available)
        saveHistory: true, // Android, save scan history (default false)
        prompt: 'Place a barcode inside the scan area', // Android
        resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
        formats: 'QR_CODE,PDF_417', // default: all but PDF_417 and RSS_EXPANDED
        disableAnimations: false, // iOS
        disableSuccessBeep: false // iOS and Android
      }
    )
  }
}

app.initialize()


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map