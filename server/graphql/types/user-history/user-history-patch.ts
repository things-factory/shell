import { gql } from 'apollo-server-koa'

export const UserHistoryPatch = gql`
  input UserHistoryPatch {
    name: String
  }
`
