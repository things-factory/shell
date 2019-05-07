import { gql } from 'apollo-server-koa'

export const NewUserHistory = gql`
  input NewUserHistory {
    name: String!
  }
`
