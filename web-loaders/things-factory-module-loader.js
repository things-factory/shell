const path = require('path')
const fs = require('fs')
const loaderUtils = require('loader-utils')

module.exports = function(content) {
  const module_folders = {}

  const options = loaderUtils.getOptions(this) || {}

  var module_path = options.module_path ? options.module_path : path.resolve(__dirname, '../node_modules')

  try {
    const thingsdir = path.resolve(module_path, '@things-factory')
    const folders = fs.readdirSync(thingsdir)

    /**
     * package.json의 things-shell 속성이 truthy 인 경우를 필터링한다.
     */
    folders.forEach(folder => {
      try {
        const pkg = require(path.resolve(thingsdir, folder, 'package.json'))
        if (pkg['things-factory']) module_folders[pkg.name] = path.resolve(thingsdir, folder)
      } catch (e) {
        console.warn(e)
      }
    })
  } catch (e) {
    console.warn('[things-factory-module-loader]', '@things-factory module folder not found.')
  }

  try {
    /* 현재폴더의 package.json을 보고 추가한다. */
    const cwd = process.cwd()
    const pkg = require(path.resolve(cwd, 'package.json'))
    if (pkg['things-factory']) module_folders[pkg.name] = cwd
  } catch (e) {
    console.error(e)
  }

  var metas = {}

  for (let moduleName in module_folders) {
    let folder = module_folders[moduleName]
    try {
      metas[moduleName] = `${folder}/things-factory.config.js`
    } catch (e) {
      console.warn('[things-factory-module-loader]', 'things-factory.config.js file not found.')
    }
  }

  var result =
    'var metas = [];\n' +
    Object.keys(metas)
      .map((module, idx) => {
        return `import v${idx} from "${metas[module]}";\nmetas["${module}"] = v${idx};`
      })
      .join(';\n') +
    ';\nexport default metas;'

  console.log('exports: ', result)

  return result
}
