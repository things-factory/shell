import { gql } from 'apollo-server-koa'

export const UsersRolePatch = gql`
  input UsersRolePatch {
    userId: String
    roleId: String
  }
`
