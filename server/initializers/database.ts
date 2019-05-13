const path = require('path')
const appRootPath = require('app-root-path').path

var ormconfig
try {
  ormconfig = require(path.resolve(appRootPath, 'ormconfig'))
} catch (e) {
  ormconfig = require('@things-factory/shell/ormconfig')
}

import { createConnection } from 'typeorm'

export const databaseInitializer = async () => {

  return await createConnection(ormconfig)
  .then(async (connection, ...others) => {
    console.log('Database connection established')
  })
}
