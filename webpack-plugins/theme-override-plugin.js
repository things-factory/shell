/*
 * 모든 모듈의 theme 파일들에 오버라이드를 적용해서 최종에 theme css파일로 병합될 파일리스트를 선정하여, webpack의 inputOption에 추가한다.
 */

const path = require('path')
const glob = require('glob')

const { orderedModuleNames } = require('@things-factory/env')

const AppRootPath = require('app-root-path').path
const AppPackage = require(path.resolve(AppRootPath, 'package.json'))

class ThemeOverridePlugin {
  constructor(options = {}) {
    this.options = options
    this.writtenFrom = {}
    this.writtenTo = {}
  }

  apply(compiler) {
    compiler.plugin('entryOption', (compilation, entry) => {
      var appname = AppPackage.name

      var { chunk = 'theme', themeFolder = path.join('client', 'themes') } = this.options

      var reversedModuleNames = [...orderedModuleNames, appname].reverse()
      var themeFiles = {}

      /* 최상위 모듈부터 복사한다. 하위 모듈에서는 중복 여부에 따라 복사여부를 결정한다. */
      reversedModuleNames.forEach(m => {
        if (appname == m) {
          var modulePath = AppRootPath
        } else {
          var modulePath = path.dirname(require.resolve(`${m}/package.json`))
        }

        var sourcePath = path.join(modulePath, themeFolder)

        var files = glob.sync(path.join(sourcePath, '*.?(sass|scss|css)'))

        files.forEach(filepath => {
          let filename = path.basename(filepath)

          if (!themeFiles[filename]) {
            themeFiles[filename] = filepath
          }
        })
      })

      entry[chunk] = Object.values(themeFiles)
    })
  }
}

module.exports = ThemeOverridePlugin
