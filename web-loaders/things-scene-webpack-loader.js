const path = require('path')
const fs = require('fs')
const loaderUtils = require('loader-utils')

module.exports = function(content) {
  const sceneComponents = []

  const options = loaderUtils.getOptions(this) || {}

  var module_path = options.module_path ? options.module_path : path.resolve(__dirname, '../node_modules')

  try {
    const thingsdir = path.resolve(module_path, '@things-scene')
    const folders = fs.readdirSync(thingsdir)

    folders.forEach(folder => {
      try {
        const pkg = require(path.resolve(thingsdir, folder, 'package.json'))
        sceneComponents.push(pkg.name)
      } catch (e) {
        console.warn(e)
      }
    })
  } catch (e) {
    console.warn('[things-scene-webpack-loader]', '@things-scene module folder not found.')
  }

  try {
    /* 현재폴더의 package.json을 보고 추가한다. */
    const cwd = process.cwd()
    const pkg = require(path.resolve(cwd, 'package.json'))
    pkg['things-scene'] && sceneComponents.push(path.resolve(cwd, pkg.main))
  } catch (e) {
    console.error(e)
  }

  const script = sceneComponents.map(component => `import '${component}';\n`).join('')

  console.log('***************************** [ Things Scene Components - BEGIN ]')
  console.log(script)
  console.log('***************************** [ Things Scene Components - END   ] ')

  return script
}
