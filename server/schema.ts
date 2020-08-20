import path from 'path'
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

const { queries, mutations, subscriptions, directives, types } = schemas.typeDefs
const defs = {
  query: queries.length > 0 ? ['type Query {', ...queries, '}'].join('\n') : '',
  mutation: mutations.length > 0 ? ['type Mutation {', ...mutations, '}'].join('\n') : '',
  subscription: subscriptions.length > 0 ? ['type Subscription {', ...subscriptions, '}'].join('\n') : ''
}

const typeDefs = [
  `
    schema {
      ${defs.query ? 'query: Query' : ''}
      ${defs.mutation ? 'mutation: Mutation' : ''}
      ${defs.subscription ? 'subscription: Subscription' : ''}
    }
  `,
  defs.query,
  defs.mutation,
  defs.subscription,

  [...directives].join('\n'),

  `
    scalar Upload
  `,

  ...types
].filter(type => !!type)

logger.info('schema:\n%s', typeDefs.join('\n'))

var { resolvers } = schemas
var queryResolvers =
  resolvers.queries.length > 0 &&
  resolvers.queries.reduce((sum, query) => {
    return {
      ...sum,
      ...query
    }
  }, {})

var mutationResolvers =
  resolvers.mutations.length > 0 &&
  resolvers.mutations.reduce((sum, mutation) => {
    return {
      ...sum,
      ...mutation
    }
  }, {})

var subscriptionResolvers =
  resolvers.subscriptions.length > 0 &&
  resolvers.subscriptions.reduce((sum, subscription) => {
    return {
      ...sum,
      ...subscription
    }
  }, {})

var subqueryResolvers =
  resolvers.subqueryResolvers.length > 0 &&
  resolvers.subqueryResolvers.reduce((sum, subResolver) => {
    return {
      ...sum,
      ...subResolver
    }
  }, {})

var directiveResolvers = resolvers.directives.reduce((sum, directive) => {
  return {
    ...sum,
    ...directive
  }
}, {})

resolvers = {
  Upload: GraphQLUpload as any,
  ...subqueryResolvers
}

if (queryResolvers) {
  resolvers['Query'] = queryResolvers
}
if (mutationResolvers) {
  resolvers['Mutation'] = mutationResolvers
}
if (subscriptionResolvers) {
  resolvers['Subscription'] = subscriptionResolvers
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  directiveResolvers
})
