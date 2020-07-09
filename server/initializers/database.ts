const path = require('path')
const appRootPath = process.cwd()
import { createConnection } from 'typeorm'
import { logger } from '@things-factory/env'
import { Domain } from '../entities'

var ormconfig
try {
  ormconfig = require(path.resolve(appRootPath, 'ormconfig'))
} catch (e) {
  ormconfig = require('@things-factory/shell/ormconfig')
}

ormconfig.entities.push(Domain)

export const databaseInitializer = async () => {
  return await createConnection(ormconfig).then(async (connection, ...others) => {
    logger.info('Database connection established')
  })
}
