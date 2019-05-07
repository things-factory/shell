import { gql } from 'apollo-server-koa'

export const UserRoleHistory = gql`
  type UserRoleHistory {
    name: String
  }
`
