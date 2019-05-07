import { gql } from 'apollo-server-koa'

export const NewRole = gql`
  input NewRole {
    name: String!
    description: String
  }
`
