const path = require('path')
const appRootPath = require('app-root-path').path

var ormconfig
try {
  ormconfig = require(path.resolve(appRootPath, 'ormconfig'))
} catch (e) {
  ormconfig = require('@things-factory/shell/ormconfig')
}

import { createConnection } from 'typeorm'
import { entities } from '../entities'

const dependencyOrders = require('../dependency-order')

export const databaseInitializer = async () => {
  const dependencyList = await dependencyOrders()
  const totalEntities = dependencyList
    .map(dep => {
      try {
        return require(dep).entities
      } catch (e) {
        console.error(e)
      }
    })
    .filter(entity => entity && entity.length > 0)
    .flat()
    .concat(entities)

  console.log('totalEntities', totalEntities)

  return await createConnection({
    ...ormconfig,
    entities: totalEntities
  }).then(async (connection, ...others) => {
    console.log('Database connection established')
  })
}
