const path = require('path')

import { GraphQLUpload } from 'graphql-upload'

const appRootPath = require('app-root-path').path
const selfModulePackage = require(path.resolve(appRootPath, 'package.json'))
const selfModuleName = selfModulePackage.name
const selfModule = selfModulePackage['things-factory'] && require(path.resolve(appRootPath, selfModulePackage.main))

import { orderedModuleNames, logger } from '@things-factory/env'
import { makeExecutableSchema } from 'graphql-tools'

const schemas = orderedModuleNames
  .map(dep => {
    try {
      if (selfModuleName == dep) {
        /* self module entities */
        return selfModule && selfModule.schema
      } else {
        return require(dep).schema
      }
    } catch (e) {
      logger.error(e)
    }
  })
  .filter(schema => schema)
  .reduce(
    (sum, schema) => {
      let { typeDefs, resolvers } = sum

      return {
        typeDefs: {
          types: [...typeDefs.types, ...((schema.typeDefs && schema.typeDefs.types) || [])],
          queries: [...typeDefs.queries, ...((schema.typeDefs && schema.typeDefs.queries) || [])],
          mutations: [...typeDefs.mutations, ...((schema.typeDefs && schema.typeDefs.mutations) || [])],
          directives: [...typeDefs.directives, ...((schema.typeDefs && schema.typeDefs.directives) || [])]
        },
        resolvers: {
          queries: [...resolvers.queries, ...((schema.resolvers && schema.resolvers.queries) || [])],
          mutations: [...resolvers.mutations, ...((schema.resolvers && schema.resolvers.mutations) || [])],
          directives: [...resolvers.directives, ...((schema.resolvers && schema.resolvers.directives) || [])]
        }
      }
    },
    {
      typeDefs: {
        types: [],
        queries: [],
        mutations: [],
        directives: []
      },
      resolvers: {
        queries: [],
        mutations: [],
        directives: []
      }
    }
  )

logger.info('schemas')
logger.info(JSON.stringify(schemas, null, 2))

const queryTypes = ['type Query {', ...schemas.typeDefs.queries, '}'].join('\n')
const mutationTypes = ['type Mutation {', ...schemas.typeDefs.mutations, '}'].join('\n')
const directiveTypes = [...schemas.typeDefs.directives].join('\n')

const typeDefs = [
  `
    schema {
      query: Query
      mutation: Mutation
    }
  `,
  queryTypes,
  mutationTypes,
  directiveTypes,

  `scalar Upload`,

  ...schemas.typeDefs.types
]

var queryResolvers = schemas.resolvers.queries.reduce((sum, query) => {
  return {
    ...sum,
    ...query
  }
}, {})

var mutationResolvers = schemas.resolvers.mutations.reduce((sum, mutation) => {
  return {
    ...sum,
    ...mutation
  }
}, {})

var directiveResolvers = schemas.resolvers.directives.reduce((sum, directive) => {
  return {
    ...sum,
    ...directive
  }
}, {})

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: queryResolvers as any,
    Mutation: mutationResolvers as any,
    Upload: GraphQLUpload as any
  },
  directiveResolvers
})
