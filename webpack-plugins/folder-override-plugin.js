/*
 * 모든 모듈의 특정 폴더(특히, assets)를 모듈 디펜던시 순서에 따라 오버라이드 및 병합한다.
 */

const path = require('path')
const fs = require('fs-extra')
const glob = require('glob')
const loaderUtils = require('loader-utils')

const { orderedModuleNames } = require('@things-factory/env')

const AppRootPath = require('app-root-path').path
const AppPackage = require(path.resolve(AppRootPath, 'package.json'))

class FolderOverridePlugin {
  constructor(options = {}) {
    this.options = options
    this.writtenFrom = {}
    this.writtenTo = {}
  }

  apply(compiler) {
    var contexts = []

    compiler.plugin('emit', (compilation, callback) => {
      /* contexts 초기화 */
      contexts = []

      var appname = AppPackage.name

      var targetDir = this.options.target
      var reversedModuleNames = [...orderedModuleNames, appname].reverse()

      /* 최상위 모듈부터 복사한다. 하위 모듈에서는 중복 여부에 따라 복사여부를 결정한다. */
      reversedModuleNames.forEach(m => {
        if (appname == m) {
          var modulePath = AppRootPath
        } else {
          var modulePath = path.dirname(require.resolve(`${m}/package.json`))
        }

        var sourcePath = path.resolve(modulePath, targetDir)
        contexts.push(sourcePath)

        var files = glob.sync(`${sourcePath}/**/*`)

        files.forEach(filepath => {
          let relativePath = path.relative(modulePath, filepath)

          this.write(compilation, filepath, relativePath)
        })
      })

      callback()
    })

    compiler.plugin('after-emit', (compilation, callback) => {
      // Add context dependencies if they're not already tracked
      contexts.forEach(context => {
        if (!compilation.contextDependencies.has(context)) {
          compilation.contextDependencies.add(context)
        }
      })

      callback()
    })
  }

  write(compilation, filepath, relativePath) {
    var stat = fs.statSync(filepath)
    if (stat.isDirectory()) {
      return
    }

    var content = fs.readFileSync(filepath)
    const hash = loaderUtils.getHashDigest(content)
    const webpackTo = loaderUtils.interpolateName(
      {
        resourcePath: filepath
      },
      relativePath,
      {
        content
      }
    )

    if (this.writtenTo[webpackTo] && this.writtenTo[webpackTo] !== filepath) {
      return
    }

    if (this.writtenFrom[filepath] && this.writtenFrom[filepath][hash]) {
      // console.log(`skipping '${filepath}', because it hasn't changed`)
      return
    }

    console.log(`writing '${webpackTo}' from '${filepath}'`)
    this.writtenTo[webpackTo] = filepath
    this.writtenFrom[filepath] = {
      [hash]: true
    }

    this.writtenFrom[filepath].webpackTo = webpackTo

    compilation.assets[webpackTo] = {
      size() {
        return stat.size
      },
      source() {
        return content
      }
    }
  }
}

module.exports = FolderOverridePlugin
