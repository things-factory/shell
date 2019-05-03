const path = require('path')
const fs = require('fs')
const loaderUtils = require('loader-utils')
const fetchPackage = require('package-json')
const { solve } = require('dependency-solver')

var DEPENDENCY_MAP = {}

async function getDependencies(packageNames = []) {
  for (const name of packageNames) {
    if (DEPENDENCY_MAP[name] || name == '@things-factory/shell') {
      continue
    }

    var packageJson = await fetchPackage(name, 'latest')

    var deps = Object.keys(packageJson.dependencies || [])

    var filtered = deps.filter(d => d.startsWith('@things-factory/'))

    if (!filtered || filtered.length === 0) continue
    if (DEPENDENCY_MAP[name]) continue

    DEPENDENCY_MAP[name] = filtered

    await getDependencies(filtered)
  }
}

module.exports = async function(content) {
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
    folders.forEach(folder => {
      try {
        const pkg = require(path.resolve(thingsdir, folder, 'package.json'))
        if (pkg['things-factory']) {
          moduleConfigMap[pkg.name] = {
            pkg,
            config: path.resolve(thingsdir, folder, 'things-factory.config.js')
          }
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
      moduleConfigMap[pkg.name] = {
        pkg,
        config: path.resolve(cwd, 'things-factory.config.js')
      }
    }

    /* Project 의 dependencies/dev-dependencies를 시작으로 dependencies traverse를 정열한다. */
    const deps = {
      ...pkg.dependencies,
      ...pkg.devDependencies
    }

    const packageNames = Object.keys(deps).filter(dep => dep.startsWith('@things-factory/'))
    // const DEPENDENCY_MAP = {
    //   [pkg.name]: packageNames,
    //   ...(await getDependencies(packageNames))
    // }

    DEPENDENCY_MAP[pkg.name] = packageNames

    await getDependencies(packageNames)

    orderedModuleNames = solve(DEPENDENCY_MAP)
  } catch (e) {
    console.error(e)
  }

  console.info('\n[ ORDERED MODULE LIST ]')
  orderedModuleNames.map((m, idx) => console.info(`- ${idx} : ${m}`))
  console.info('[/ ORDERED MODULE LIST ]\n')

  var result = `
export var modules = [];

  ${orderedModuleNames
    .filter(name => moduleConfigMap[name])
    .map((module, idx) => {
      return `
import v${idx} from "${moduleConfigMap[module].config}";
modules.push({
  ...v${idx},
  name: "${moduleConfigMap[module].pkg.name}",
  version: "${moduleConfigMap[module].pkg.version}",
  license: "${moduleConfigMap[module].pkg.license}"
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
