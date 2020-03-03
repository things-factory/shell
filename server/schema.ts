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
          subscriptions: [...typeDefs.subscriptions, ...((schema.typeDefs && schema.typeDefs.subscriptions) || [])],
          directives: [...typeDefs.directives, ...((schema.typeDefs && schema.typeDefs.directives) || [])]
        },
        resolvers: {
          queries: [...resolvers.queries, ...((schema.resolvers && schema.resolvers.queries) || [])],
          mutations: [...resolvers.mutations, ...((schema.resolvers && schema.resolvers.mutations) || [])],
          subscriptions: [...resolvers.subscriptions, ...((schema.resolvers && schema.resolvers.subscriptions) || [])],
          directives: [...resolvers.directives, ...((schema.resolvers && schema.resolvers.directives) || [])]
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
        directives: []
      }
    }
  )

logger.info('schemas %s', JSON.stringify(schemas, null, 2))
const queryTypes = ['type Query {', ...schemas.typeDefs.queries, '}'].join('\n')
const mutationTypes = ['type Mutation {', ...schemas.typeDefs.mutations, '}'].join('\n')
const subscriptionTypes = ['type Subscription {', ...schemas.typeDefs.subscriptions, '}'].join('\n')
const directiveTypes = [...schemas.typeDefs.directives].join('\n')

const typeDefs = [
  `
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
console.log('####################')
console.log('####################')
console.log('typeDefs', typeDefs)
console.log('queryResolvers', queryResolvers)
console.log('####################')
console.log('####################')

var parentResolvers = queryResolvers.Parent
delete queryResolvers.Parent

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: queryResolvers as any,
    Mutation: mutationResolvers as any,
    Subscription: subscriptionResolvers as any,
    Upload: GraphQLUpload as any,
    Parent: parentResolvers
  },
  directiveResolvers
})

// const resolvers = {
//   Query: {
//     author(parent, args, context, info) {
//       return find(authors, { id: args.id });
//     },
//   },
//   Author: {
//     books(author) {
//       return filter(books, { author: author.name });
//     },
//   },
// };
