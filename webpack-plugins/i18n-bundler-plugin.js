const orderedModuleNames = require('@things-factory/env').orderedModuleNames
const path = require('path')
var glob = require('glob')

const AppRootPath = require('app-root-path').path
const AppPackage = require(path.resolve(AppRootPath, 'package.json'))

const merge = (target, source) => {
  for (let key of Object.keys(source)) {
    if (source[key] instanceof Object) Object.assign(source[key], merge(target[key], source[key]))
  }

  Object.assign(target || {}, source)
  return target
}

function I18nBundlerPlugin(options) {
  this.options = options
}

I18nBundlerPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', (compilation, callback) => {
    var appname = AppPackage.name

    var translations = orderedModuleNames.reduce((summary, m) => {
      if (appname == m) {
        var modulePath = AppRootPath
      } else {
        var modulePath = path.dirname(require.resolve(`${m}/package.json`))
      }
      var localesPath = path.resolve(modulePath, 'assets', 'locales')

      var files = glob.sync(`${localesPath}/*.json`)

      return files.reduce((summary, file) => {
        let ts = require(file)
        var filename = file.replace(/^.*[\\\/]/, '')
        var locale = filename.substring(0, filename.length - 5)

        summary[locale] = merge(summary[locale] || {}, ts)
        return summary
      }, summary)
    }, {})

    /* 각 locale 별로 file을 저장한다. */
    var localeDir = this.options.output || 'translations'
    for (let locale in translations) {
      let localePath = path.join(localeDir, `${locale}.json`)
      let content = JSON.stringify(translations[locale], null, 2)

      compilation.assets[localePath] = {
        source: function() {
          return content
        },
        size: function() {
          return content.length
        }
      }
    }

    callback()
  })
}

module.exports = I18nBundlerPlugin
