const path = require('path')
const appRootPath = process.cwd()

import 'reflect-metadata'
import { createConnection, useContainer } from 'typeorm'
import { Container } from 'typedi'
import { logger } from '@things-factory/env'

useContainer(Container)

var ormconfig
try {
  console.log(appRootPath)
  ormconfig = require(path.resolve(appRootPath, 'ormconfig'))
} catch (e) {
  ormconfig = require('@things-factory/shell/ormconfig')
}

console.log('ORMCONFIG', ormconfig)

export const databaseInitializer = async () => {
  return await createConnection(ormconfig).then(async (connection, ...others) => {
    logger.info('Database connection established')
  })
}
