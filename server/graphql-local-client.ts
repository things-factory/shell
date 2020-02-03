import { ApolloServerBase } from 'apollo-server-core'
import { GraphQLResponse } from 'apollo-server-types'
import { print, DocumentNode } from 'graphql'

type StringOrAst = string | DocumentNode

// A query must not come with a mutation (and vice versa).
type Query = {
  query: StringOrAst
  mutation?: undefined
  variables?: {
    [name: string]: any
  }
  operationName?: string
}

type Mutation = {
  mutation: StringOrAst
  query?: undefined
  variables?: {
    [name: string]: any
  }
  operationName?: string
}

export interface ApolloServerLocalClient {
  query: (query: Query) => Promise<GraphQLResponse>
  mutate: (mutation: Mutation) => Promise<GraphQLResponse>
}

export function createLocalClient(schema): ApolloServerLocalClient {
  const resolve = async ({ query, mutation, variables, context }) => {
    // Create a new Apollo Server for each request
    const server = new ApolloServerBase({
      schema,
      context: {
        // ⚠️ Note: here you should construct your GraphQL
        // context! When calling the query/mutation, I
        // usually like to override some properties (eg the
        // authed user which I attach to the context). Here
        // is where you need to put all your default GraphQL
        // context data. Eg dataloaders etc.
        ...context
      }
    })

    const executeOperation = server.executeOperation.bind(server)
    const operation = query || mutation
    if (!operation || (!!query && !!mutation)) {
      throw new Error('Either query or mutation must be passed, but not both')
    }

    // Execute the actual operation
    const res = await executeOperation({
      variables,
      query: typeof operation === 'string' ? operation : print(operation)
    })

    // Throw an error with all the messages of the
    // errors to make them easy to match using Jest
    if (!!res.errors && !!res.errors.length) {
      const message = res.errors.map(error => error.message).join('\n')
      throw new Error(message)
    }

    return res
  }

  return { query: resolve, mutate: resolve }
}
