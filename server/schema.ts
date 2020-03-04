const path = require('path')

import { logger, orderedModuleNames } from '@things-factory/env'
import { makeExecutableSchema } from 'graphql-tools'
import { GraphQLUpload } from 'graphql-upload'

const appRootPath = require('app-root-path').path
const selfModulePackage = require(path.resolve(appRootPath, 'package.json'))
const selfModuleName = selfModulePackage.name
const selfModule = selfModulePackage['things-factory'] && require(path.resolve(appRootPath, selfModulePackage.main))

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
      const { typeDefs, resolvers } = sum
      let { typeDefs: sTypeDefs, resolvers: sResolvers } = schema
      const newResolvers = {
        mutations: [],
        subscriptions: [],
        directives: [],
        ...sResolvers,
        queries: [],
        subqueryResolvers: []
      }
      sResolvers?.queries?.forEach(q => {
        const queryEntries = Object.entries(q)
        queryEntries.forEach(entry => {
          const key = entry[0]
          const val = entry[1]
          if (typeof val == 'object' && val instanceof Object && !Array.isArray(val)) {
            newResolvers.subqueryResolvers.push({ [key]: val })
          } else {
            newResolvers.queries.push({ [key]: val })
          }
        })
      })

      return {
        typeDefs: {
          types: [...typeDefs.types, ...(sTypeDefs?.types || [])],
          queries: [...typeDefs.queries, ...(sTypeDefs?.queries || [])],
          mutations: [...typeDefs.mutations, ...(sTypeDefs?.mutations || [])],
          subscriptions: [...typeDefs.subscriptions, ...(sTypeDefs?.subscriptions || [])],
          directives: [...typeDefs.directives, ...(sTypeDefs?.directives || [])]
        },
        resolvers: {
          queries: [...resolvers.queries, ...newResolvers.queries],
          mutations: [...resolvers.mutations, ...newResolvers.mutations],
          subscriptions: [...resolvers.subscriptions, ...newResolvers.subscriptions],
          directives: [...resolvers.directives, ...newResolvers.directives],
          subqueryResolvers: [...resolvers.subqueryResolvers, ...newResolvers.subqueryResolvers]
        }
      }
    },
    {
      typeDefs: {
        types: [],
        queries: [],
        mutations: [],
        subscriptions: [],
        directives: []
      },
      resolvers: {
        queries: [],
        mutations: [],
        subscriptions: [],
        directives: [],
        subqueryResolvers: []
      }
    }
  )

logger.info('schemas %s', JSON.stringify(schemas, null, 2))

const queryTypes = ['type Query {', ...schemas.typeDefs.queries, '}'].join('\n')
const mutationTypes = ['type Mutation {', ...schemas.typeDefs.mutations, '}'].join('\n')
const subscriptionTypes = ['type Subscription {', ...schemas.typeDefs.subscriptions, '}'].join('\n')
const directiveTypes = [...schemas.typeDefs.directives].join('\n')

const typeDefs = [
  /* GraphQL */ `
    schema {
      query: Query
      mutation: Mutation
      subscription: Subscription
    }
  `,
  queryTypes,
  mutationTypes,
  subscriptionTypes,
  directiveTypes,

  /* GraphQL */ `
    scalar Upload
  `,

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

var subscriptionResolvers = schemas.resolvers.subscriptions.reduce((sum, subscription) => {
  return {
    ...sum,
    ...subscription
  }
}, {})

var directiveResolvers = schemas.resolvers.directives.reduce((sum, directive) => {
  return {
    ...sum,
    ...directive
  }
}, {})

var subqueryResolvers = schemas.resolvers.subqueryResolvers.reduce((sum, subResolver) => {
  return {
    ...sum,
    ...subResolver
  }
}, {})

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: queryResolvers as any,
    Mutation: mutationResolvers as any,
    Subscription: subscriptionResolvers as any,
    Upload: GraphQLUpload as any,
    ...subqueryResolvers
  },
  directiveResolvers
})
