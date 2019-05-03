import { gql } from 'apollo-server-koa'

export const NewResource = gql`
  input NewResource {
    name: String!
  }
`
