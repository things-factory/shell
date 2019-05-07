const path = require('path')
const appRootPath = require('app-root-path').path
const selfModulePackage = require(path.resolve(appRootPath, 'package.json'))
const selfModuleName = selfModulePackage.name
const selfModule = require(path.resolve(appRootPath, selfModulePackage.main))
import { getOrderedModuleNames } from '@things-factory/env'

var ormconfig
try {
  ormconfig = require(path.resolve(appRootPath, 'ormconfig'))
} catch (e) {
  ormconfig = require('@things-factory/shell/ormconfig')
}

import { createConnection } from 'typeorm'
// import { entities } from '../entities'

export const databaseInitializer = async () => {
  const orderedModuleNames = await getOrderedModuleNames()

  const totalEntities = [...orderedModuleNames]
    .map(dep => {
      try {
        if (selfModuleName == dep) {
          /* self module entities */
          return selfModule.entities
        } else {
          return require(dep).entities
        }
      } catch (e) {
        console.error(e)
      }
    })
    .filter(entity => entity && entity.length > 0)
    .flat()

  console.log('totalEntities')
  console.log(totalEntities)

  return await createConnection({
    ...ormconfig,
    entities: totalEntities
  }).then(async (connection, ...others) => {
    console.log('Database connection established')
  })
}
