const path = require('path')
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

    DEPENDENCY_MAP[name] = filtered

    await getDependencies(filtered)
  }
}

var orderedModuleNames = []

module.exports = async function(content) {
  if (orderedModuleNames.length > 0) {
    return orderedModuleNames
  }

  const appRootPath = require('app-root-path').path
  const pkg = require(path.resolve(appRootPath, 'package.json'))

  try {
    const dependencyNames = Object.keys(pkg.dependencies).filter(dep => dep.startsWith('@things-factory/'))
    const devDependencyNames = Object.keys(pkg.devDependencies).filter(dep => dep.startsWith('@things-factory/'))

    if (pkg.name !== '@things-factory/shell') {
      DEPENDENCY_MAP[pkg.name] = dependencyNames
    }

    await getDependencies(dependencyNames)
    await getDependencies(devDependencyNames)

    orderedModuleNames = solve(DEPENDENCY_MAP)

    console.info('\n[ ORDERED MODULE LIST ]')
    orderedModuleNames.map((m, idx) => console.info(`- ${idx} : ${m}`))
    console.info('[/ ORDERED MODULE LIST ]\n')

    return orderedModuleNames
  } catch (e) {
    console.error(e)
  }
}
