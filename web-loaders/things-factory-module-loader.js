const path = require('path')
const fs = require('fs')
const loaderUtils = require('loader-utils')
const fetchPackage = require('package-json')
const { solve } = require('dependency-solver')

async function getDependencies(packageNames = []) {
  var dependencyMap = {}

  for (const name of packageNames) {
    var packageJson = await fetchPackage(name, 'latest')

    var deps = Object.keys(packageJson.dependencies || [])

    var filtered = deps.filter(d => d.startsWith('@things-factory/'))

    if (!filtered || filtered.length === 0) continue
    if (dependencyMap[name]) continue

    dependencyMap[name] = filtered

    dependencyMap = {
      ...dependencyMap,
      ...(await getDependencies(filtered))
    }
  }

  return dependencyMap
}

module.exports = async function(content) {
  const moduleConfigMap = {}

  const options = loaderUtils.getOptions(this) || {}

  var modulePath = options.module_path ? options.module_path : path.resolve(__dirname, '../node_modules')

  try {
    const thingsdir = path.resolve(modulePath, '@things-factory')
    const folders = fs.readdirSync(thingsdir)

    /**
     * package.json의 things-shell 속성이 truthy 인 경우를 필터링한다.
     */
    folders.forEach(folder => {
      try {
        const pkg = require(path.resolve(thingsdir, folder, 'package.json'))
        if (pkg['things-factory']) {
          moduleConfigMap[pkg.name] = path.resolve(thingsdir, folder, 'things-factory.config.js')
        }
      } catch (e) {
        console.warn(e)
      }
    })
  } catch (e) {
    console.warn('[things-factory-module-loader]', '@things-factory module folder not found.')
  }

  var orderedModuleNames = []

  try {
    /* 현재폴더의 package.json을 보고 moduleConfigMap에 추가한다. */
    const cwd = process.cwd()
    const pkg = require(path.resolve(cwd, 'package.json'))
    if (pkg['things-factory']) {
      moduleConfigMap[pkg.name] = path.resolve(cwd, 'things-factory.config.js')
    }

    /* Project 의 dependencies/dev-dependencies를 시작으로 dependencies traverse를 정열한다. */
    const deps = {
      ...pkg.dependencies,
      ...pkg.devDependencies
    }

    const packageNames = Object.keys(deps).filter(dep => dep.startsWith('@things-factory/'))
    const dependencyMap = {
      [pkg.name]: packageNames,
      ...(await getDependencies(packageNames))
    }

    orderedModuleNames = solve(dependencyMap)

    console.log('Ordered Modules : ', orderedModuleNames)
  } catch (e) {
    console.error(e)
  }

  var result = `
  var metas = [];

  ${orderedModuleNames
    .filter(name => moduleConfigMap[name])
    .map((module, idx) => {
      return `
        import v${idx} from "${moduleConfigMap[module]}";
        metas[${idx}] = v${idx};
      `
    })
    .join('')}
  
  export default metas;
  `
  console.log('exports: ', result)

  return result
}
