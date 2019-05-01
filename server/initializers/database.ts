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

export const databaseInitializer = async () => {
  return await createConnection({
    ...ormconfig,
    entities
  }).then(async (connection, ...others) => {
    debugger
    console.log('Database connection established')
  })
}
