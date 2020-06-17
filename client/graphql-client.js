import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { createUploadLink } from 'apollo-upload-client'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { persistCache } from 'apollo-cache-persist'
import { AbstractThingsFactoryGraphQLError } from '@things-factory/error'

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
    graphQLErrors.map(error => {
      const { message, locations, path, extensions } = error

      document.dispatchEvent(
        new CustomEvent('localize', {
          bubbles: true,
          composed: true,
          detail: {
            messageId: `error.${message}`,
            callback: localizedMessage => {
              document.dispatchEvent(
                new CustomEvent('notify', {
                  detail: {
                    level: 'error',
                    message: localizedMessage,
                    ex: graphQLErrors,
                    option: {
                      action: {
                        label: 'detail',
                        callback: () => alert(extensions.exception.stacktrace.join('\n'))
                      }
                    }
                  }
                })
              )
            }
          }
        })
      )
    })

  if (networkError) {
    switch (networkError.statusCode) {
      case 401:
        /* 401 에러가 리턴되면, 인증이 필요하다는 메시지를 dispatch 한다. 이 auth 모듈 등에서 이 메시지를 받아서 signin 프로세스를 진행할 수 있다. */
        document.dispatchEvent(
          new CustomEvent('auth-required', {
            bubbles: true,
            composed: true
          })
        )
        break
      default:
        document.dispatchEvent(
          new CustomEvent('notify', {
            detail: {
              level: 'error',
              message: `[Network error - ${networkError.statusCode}]: ${networkError}`,
              ex: networkError
            }
          })
        )
    }
  }
}

const cache = new InMemoryCache({
  addTypename: false
  // dataIdFromObject: object => object.key
})

const httpOptions = {
  GRAPHQL_URI,
  credentials: 'include'
}

const httpLink = ApolloLink.split(
  operation => operation.getContext().hasUpload,
  createUploadLink(httpOptions),
  new BatchHttpLink(httpOptions)
)

const initPersistCache = async () => {
  persistCache({
    cache,
    storage: window.localStorage
  })
}

// initPersistCache()

export const client = new ApolloClient({
  defaultOptions,
  cache,
  link: ApolloLink.from([onError(ERROR_HANDLER), httpLink])
})
