import { gql } from 'apollo-server-koa'

export const UsersRole = gql`
  type UsersRole {
    userId: String
    roleId: String
  }
`
