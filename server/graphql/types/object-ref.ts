import { gql } from 'apollo-server-koa'

export const ObjectRef = gql`
  input ObjectRef {
    id: String!
    name: String
    description: String
  }
`
