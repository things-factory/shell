const path = require('path')
const fs = require('fs')
const loaderUtils = require('loader-utils')

module.exports = function(content) {
  const sceneModuleFolders = {}

  const options = loaderUtils.getOptions(this) || {}

  var module_path = options.module_path ? options.module_path : path.resolve(__dirname, '../node_modules')

  try {
    const thingsdir = path.resolve(module_path, '@things-scene')
    const folders = fs.readdirSync(thingsdir)

    /**
     * package.json의 things-shell 속성이 truthy 인 경우를 필터링한다.
     */
    folders.forEach(folder => {
      try {
        const pkg = require(path.resolve(thingsdir, folder, 'package.json'))
        if (pkg['things-scene']) {
          sceneModuleFolders[pkg.name] = path.resolve(thingsdir, folder)
        }
      } catch (e) {
        console.warn(e)
      }
    })
  } catch (e) {
    console.warn('[things-scene-config-webpack-loader]', '@things-scene module folder not found.')
  }

  try {
    /* 현재폴더의 package.json을 보고 추가한다. */
    const cwd = process.cwd()
    const pkg = require(path.resolve(cwd, 'package.json'))
    if (pkg['things-scene']) {
      sceneModuleFolders[pkg.name] = cwd
    }
  } catch (e) {
    console.error(e)
  }

  var sceneModules = {}

  for (let sceneModule in sceneModuleFolders) {
    let folder = sceneModuleFolders[sceneModule]
    try {
      sceneModules[sceneModule] = `${folder}/things-scene.config.js`
    } catch (e) {
      console.warn('[things-scene-config-webpack-loader]', 'things-scene.config.js file not found.')
    }
  }

  const script =
    'var metas = [];\n' +
    Object.keys(sceneModules)
      .map((sceneModule, idx) => {
        return `import v${idx} from "${sceneModules[sceneModule]}";\nmetas[${idx}] = v${idx};`
      })
      .join(';\n') +
    ';\nexport default metas;'

  console.log('***************************** [ Things Scene Components for Modeller - BEGIN ]')
  console.log(script)
  console.log('***************************** [ Things Scene Components for Modeller - END   ] ')

  return script
}
