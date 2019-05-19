import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'

import { auth } from '@things-factory/auth-base'

const GRAPHQL_URI = '/graphql'

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore'
  },
  query: {
    fetchPolicy: 'no-cache', //'network-only'
    errorPolicy: 'all'
  },
  mutate: {
    errorPolicy: 'all'
  }
}

const ERROR_HANDLER = ({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => {
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      // ThingsSnackbar.toast(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    })

  if (networkError) {
    console.error(`[Network error - ${networkError.statusCode}]: ${networkError}`)
    switch (networkError.statusCode) {
      case 401:
        /* 401 에러가 리턴되면, 인증이 필요하다는 메시지를 dispatch 한다. 이 메시지는 auth 모듈에서 받아서 signin 프로세스를 진행한다. */
        document.dispatchEvent(new CustomEvent(auth.authRequiredEvent, { bubbles: true, composed: true }))
        break
      default:
      // ThingsSnackbar.toast(`[Network error - ${networkError.statusCode}]: ${networkError}`)
    }
  }
}

var cache = new InMemoryCache()

export const client = new ApolloClient({
  defaultOptions,
  cache,
  link: ApolloLink.from([
    onError(ERROR_HANDLER),
    new HttpLink({
      GRAPHQL_URI,
      credentials: 'include'
    })
  ])
})
