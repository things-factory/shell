const path = require('path')
const fs = require('fs')
const loaderUtils = require('loader-utils')
const fetchPackage = require('package-json')
const glob = require('glob')
const { solve } = require('dependency-solver')

const depMap = {}

function getThingsFactoryDependencyNames() {
  var files = glob.sync('node_modules/@things-factory/**/package.json', {})
  return files.map(f => {
    var matched = f.match(/(@things\-.+\/.+)\/package\.json$/)
    var packageName = matched[1]
    return packageName
  })
}

async function getDependencies(packageNames = []) {
  await new Promise(async (resolve, reject) => {
    for (const name of packageNames) {
      var packageJson = await fetchPackage(name, 'latest')
      var deps = Object.keys(packageJson.dependencies || [])

      // await getDeps.getByName(name).then(async deps => {
      var filtered = deps.filter(d => {
        return d.indexOf('@things-factory') !== -1
      })

      if (!filtered || filtered.length === 0) continue
      if (depMap[name]) continue

      depMap[name] = filtered
      await getDependencies(filtered)
      // })
    }

    return resolve()
  })
}

module.exports = async function(content) {
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

  // currentModuleDependencies
  try {
    const cwd = process.cwd()
    const pkg = require(path.resolve(cwd, 'package.json'))
    var packageNames = getThingsFactoryDependencyNames()
    packageNames.push(pkg.name)

    await getDependencies(packageNames)

    var topoSorted = solve(depMap)

    console.log('TOPO SORTED', topoSorted)
  } catch (e) {
    console.error(e)
  }

  var result =
    'var metas = [];\n' +
    Object.keys(metas)
      .map((module, idx) => {
        return `import v${idx} from "${metas[module]}";\nmetas[${idx}] = v${idx};`
      })
      .join(';\n') +
    ';\nexport default metas;'

  console.log('exports: ', result)

  return result
}
