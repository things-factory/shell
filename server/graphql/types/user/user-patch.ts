import { gql } from 'apollo-server-koa'

export const UserPatch = gql`
  input UserPatch {
    email: String
    password: String
    userType: String
  }
`
