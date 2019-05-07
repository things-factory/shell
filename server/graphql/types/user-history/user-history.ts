import { gql } from 'apollo-server-koa'

export const UserHistory = gql`
  type UserHistory {
    name: String
  }
`
