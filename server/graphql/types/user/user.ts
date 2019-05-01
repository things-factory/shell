import { gql } from 'apollo-server-koa'

export const User = gql`
  type User {
    email: String
    password: String
    userType: String
    createdAt: String
    updatedAt: String
  }
`
