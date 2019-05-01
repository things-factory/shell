import { gql } from 'apollo-server-koa'

export const NewFont = gql`
  input NewFont {
    name: String!
    provider: String!
    uri: String
    path: String
    active: Boolean
  }
`
