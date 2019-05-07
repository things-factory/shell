import { gql } from 'apollo-server-koa'

export const NewUserRoleHistory = gql`
  input NewUserRoleHistory {
    name: String!
  }
`
