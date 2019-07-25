/*
 * 모든 모듈의 translations에 정의된 locale 리소스들을 모두 모아서 하나의 translations로 병합한다.
 */

const fs = require('fs-extra')
const path = require('path')
var glob = require('glob')

const { orderedModuleNames, sceneModuleNames } = require('@things-factory/env')

const AppRootPath = require('app-root-path').path
const AppPackage = require(path.resolve(AppRootPath, 'package.json'))

function merge(target, source) {
  for (let key of Object.keys(source)) {
    if (source[key] instanceof Object) Object.assign(source[key], merge(target[key], source[key]))
  }

  Object.assign(target || {}, source)
  return target
}

class I18nBundlerPlugin {
  constructor(options = {}) {
    this.options = options
  }

  apply(compiler) {
    var contexts = []
    var files = []

    compiler.plugin('emit', (compilation, callback) => {
      /* dependencies 초기화 */
      contexts = []
      files = []

      var appname = AppPackage.name
      var modules = [...orderedModuleNames, ...sceneModuleNames].filter(modulename => modulename !== appname)
      modules.push(appname)

      var translationsDir = this.options.output || 'translations'

      var translations = modules.reduce((summary, m) => {
        if (appname == m) {
          var modulePath = AppRootPath
        } else {
          var modulePath = path.dirname(require.resolve(`${m}/package.json`))
        }
        var translationsPath = path.resolve(modulePath, translationsDir)
        contexts.push(translationsPath)

        files = glob.sync(`${translationsPath}/*.json`)

        return files.reduce((summary, file) => {
          try {
            var contents = fs.readFileSync(file)
            var json = JSON.parse(contents)

            var filename = file.replace(/^.*[\\\/]/, '')
            var locale = filename.substring(0, filename.length - 5)

            summary[locale] = merge(summary[locale] || {}, json)
          } catch (e) {
            console.error(e)
          } finally {
            return summary
          }
        }, summary)
      }, {})

      /* 각 locale 별로 file을 저장한다. */
      for (let locale in translations) {
        let localePath = path.join(translationsDir, `${locale}.json`)
        let content = JSON.stringify(translations[locale], null, 2)

        console.log(`Restoring locale '${locale}' resource into '${localePath}'`)

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

    compiler.plugin('after-emit', (compilation, callback) => {
      // Add context dependencies if they're not already tracked
      contexts.forEach(context => {
        if (!compilation.contextDependencies.has(context)) {
          compilation.contextDependencies.add(context)
        }
      })

      // Add file dependencies if they're not already tracked
      // files.forEach(file => {
      //   if (!compilation.fileDependencies.has(file)) {
      //     compilation.fileDependencies.add(file)
      //   }
      // })

      callback()
    })
  }
}

module.exports = I18nBundlerPlugin
