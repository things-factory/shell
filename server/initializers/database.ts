const path = require('path')
const appRootPath = require('app-root-path').path
import { createConnection } from 'typeorm'
import { logger } from '@things-factory/env'

var ormconfig
try {
  ormconfig = require(path.resolve(appRootPath, 'ormconfig'))
} catch (e) {
  ormconfig = require('@things-factory/shell/ormconfig')
}

export const databaseInitializer = async () => {
  return await createConnection(ormconfig).then(async (connection, ...others) => {
    logger.info('Database connection established')
  })
}
