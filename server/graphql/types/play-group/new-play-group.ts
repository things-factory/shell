import { gql } from 'apollo-server-koa'

export const NewPlayGroup = gql`
  input NewPlayGroup {
    name: String!
    description: String
  }
`
