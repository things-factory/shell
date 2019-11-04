/*
 * 모든 모듈의 serviceworker 파일들에 오버라이드를 적용해서 최종에 serviceworker 파일로 병합될 파일리스트를 선정하여, webpack의 inputOption에 추가한다.
 */

const path = require('path')
const glob = require('glob')
const fs = require('fs')

const { orderedModuleNames } = require('@things-factory/env')

const AppRootPath = require('app-root-path').path
const AppPackage = require(path.resolve(AppRootPath, 'package.json'))

class ServiceworkerFragmentInjectPlugin {
  constructor(options = {}) {
    this.options = options
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tap('serviceworker-fragment-inject-plugin', compilation => {
      // compiler.plugin('entryOption', (compilation, entry) => {
      var {
        chunk = 'serviceworker',
        swFolder = path.join('client', 'serviceworker'),
        filename = 'service-worker.js'
      } = this.options

      var serviceworker = compilation.assets['service-worker.js']
      if (!serviceworker) return

      var appname = AppPackage.name

      var reversedModuleNames = [...orderedModuleNames, appname].reverse()

      var contents = {}
      /* 최상위 모듈부터 복사한다. 하위 모듈에서는 중복 여부에 따라 복사여부를 결정한다. */
      reversedModuleNames.forEach(m => {
        if (appname == m) {
          var modulePath = AppRootPath
        } else {
          var modulePath = path.dirname(require.resolve(`${m}/package.json`))
        }

        var sourcePath = path.join(modulePath, swFolder)

        var files = glob.sync(path.join(sourcePath, 'fragment.js'))
        files.forEach(filepath => {
          const absoluteSwFragment = path.resolve(filepath)

          compilation.fileDependencies.add(absoluteSwFragment)

          contents[m] = fs.readFileSync(filepath)
        })
      })

      // compilation.assets['service-worker.js'] =
      //   compilation.assets['service-worker.js'] + Object.values(contents).join('; ')

      fs.appendFileSync(serviceworker.existsAt, Object.values(contents).join('; '), 'utf8')
    })
  }
}

module.exports = ServiceworkerFragmentInjectPlugin
