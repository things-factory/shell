import { gql } from 'apollo-server-koa'

export const NewUsersRole = gql`
  input NewUsersRole {
    userId: String
    roleId: String
  }
`
