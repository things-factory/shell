const path = require('path')

const appRootPath = require('app-root-path').path
const selfModulePackage = require(path.resolve(appRootPath, 'package.json'))
const selfModuleName = selfModulePackage.name
const selfModule = selfModulePackage['things-factory'] && require(path.resolve(appRootPath, selfModulePackage.main))

const { orderedModuleNames, config } = require('@things-factory/env')

const { NamingStrategy } = require('@things-factory/shell')

function flattenDeep(arr) {
  return arr.reduce((acc, val) => (Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val)), [])
}

/*
  dependencies list를 받아서, entities, migrations, subscribers 폴더 어레이를 빌드한다.
*/
var entities = orderedModuleNames
  .map(dep => {
    try {
      if (selfModuleName == dep) {
        /* self module entities */
        return selfModule && selfModule.entities
      } else {
        return require(dep).entities
      }
    } catch (e) {
      console.error(e)
    }
  })
  .filter(entity => entity && entity.length > 0)
entities = flattenDeep(entities)

var migrations = orderedModuleNames
  .map(dep => {
    try {
      if (selfModuleName == dep) {
        /* self module migrations */
        return selfModule && selfModule.migrations
      } else {
        return require(dep).migrations
      }
    } catch (e) {
      console.error(e)
    }
  })
  .filter(entity => entity && entity.length > 0)
migrations = flattenDeep(migrations)

var subscribers = orderedModuleNames
  .map(dep => {
    try {
      if (selfModuleName == dep) {
        /* self module subscribers */
        return selfModule && selfModule.subscribers
      } else {
        return require(dep).subscribers
      }
    } catch (e) {
      console.error(e)
    }
  })
  .filter(entity => entity && entity.length > 0)
subscribers = flattenDeep(subscribers)

console.log('entities')
console.log(entities)
console.log('migrations')
console.log(migrations)
console.log('subscribers')
console.log(subscribers)

module.exports = {
  namingStrategy: new NamingStrategy(),
  entities,
  migrations,
  subscribers,
  ...config.get('ormconfig')
}
