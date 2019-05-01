import { gql } from 'apollo-server-koa'

export const NewGroup = gql`
  input NewGroup {
    name: String!
    description: String
  }
`
