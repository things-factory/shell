const path = require('path')
const fs = require('fs')
const loaderUtils = require('loader-utils')

const { orderedModuleNames } = require('@things-factory/env')

module.exports = function(content) {
  console.time('Module Configuration')
  const moduleConfigMap = {}

  const options = loaderUtils.getOptions(this) || {}

  var modulePath = options.module_path ? options.module_path : path.resolve(__dirname, '../node_modules')

  try {
    const thingsdir = path.resolve(modulePath, '@things-factory')
    const folders = fs.readdirSync(thingsdir)

    /**
     * package.json의 things-factory 속성이 truthy 인 경우를 필터링한다.
     */
    folders.forEach(async folder => {
      try {
        const pkg = require(path.resolve(thingsdir, folder, 'package.json'))

        if (pkg['things-factory'] && pkg['native-module']) {
          moduleConfigMap[pkg.name] = path.resolve(thingsdir, folder, 'things-factory-native.config.js')
        }
      } catch (e) {
        console.warn(e)
      }
    })
  } catch (e) {
    console.warn('[things-factory-module-loader]', '@things-factory module folder not found.')
  }

  try {
    /* 현재폴더의 package.json을 보고 moduleConfigMap에 추가한다. */
    const appRootPath = require('app-root-path').path
    const pkg = require(path.resolve(appRootPath, 'package.json'))

    if (pkg['things-factory'] && pkg['native-module']) {
      moduleConfigMap[pkg.name] = path.resolve(appRootPath, 'things-factory-native.config.js')
    }
  } catch (e) {
    console.error(e)
  }

  var result = `
  export var natives = [];

  ${orderedModuleNames
    .filter(name => moduleConfigMap[name])
    .map((module, idx) => {
      return `
    import v${idx} from "${moduleConfigMap[module]}"
    natives.push({
      onMessage: v${idx}.onMessage
    })
    `
    })
    .join('')}
  `

  console.log('\x1b[31m')
  console.timeEnd('Module Configuration')
  console.log('\x1b[0m')

  return result
}
