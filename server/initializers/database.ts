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
  try {
    const connection = await createConnection(ormconfig)
    logger.info('Database connection established')
    return connection
  } catch (e) {
    logger.error(e)
  }
}
