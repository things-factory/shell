const path = require('path')

import { logger, orderedModuleNames } from '@things-factory/env'

const appRootPath = require('app-root-path').path
const selfModulePackage = require(path.resolve(appRootPath, 'package.json'))
const selfModuleName = selfModulePackage.name
const selfModule = selfModulePackage['things-factory'] && require(path.resolve(appRootPath, selfModulePackage.main))

const resolvers = orderedModuleNames
  .map(dep => {
    try {
      if (selfModuleName == dep) {
        /* self module entities */
        return selfModule && selfModule.resolvers
      } else {
        return require(dep).resolvers
      }
    } catch (e) {
      logger.error(e)
    }
  })
  .filter(resolvers => resolvers)
  .reduce((sum, resolvers) => sum.concat(resolvers), [])

logger.info('resolvers %o', resolvers)

export { resolvers }
