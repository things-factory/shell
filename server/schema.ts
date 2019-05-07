const path = require('path')
const appRootPath = require('app-root-path').path
const selfModulePackage = require(path.resolve(appRootPath, 'package.json'))
const selfModuleName = selfModulePackage.name
const selfModule = require(path.resolve(appRootPath, selfModulePackage.main))

import { getOrderedModuleNames } from '@things-factory/env'
import { makeExecutableSchema } from 'graphql-tools'

export const getSchema = async () => {
  const orderedModuleNames = await getOrderedModuleNames()

  const totalSchemas = [...orderedModuleNames]
    .map(dep => {
      try {
        if (selfModuleName == dep) {
          /* self module entities */
          return selfModule.schema
        } else {
          return require(dep).schema
        }
      } catch (e) {
        console.error(e)
      }
    })
    .filter(schema => schema)
    .reduce(
      (sum, schema) => {
        let { typeDefs, resolvers } = sum
        return {
          typeDefs: [...typeDefs, ...(schema.typeDefs || [])],
          resolvers: {
            Query: {
              ...resolvers.Query,
              ...((schema.resolvers && schema.resolvers.Query) || {})
            },
            Mutation: {
              ...resolvers.Mutation,
              ...((schema.resolvers && schema.resolvers.Mutation) || {})
            },
            Upload: resolvers.Upload || schema.resolvers.Upload
          }
        }
      },
      { typeDefs: [], resolvers: {} }
    )

  console.log('totalSchemas')
  console.log(totalSchemas)

  return makeExecutableSchema(totalSchemas)
}
