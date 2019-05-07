import { gql } from 'apollo-server-koa'

export const RolePatch = gql`
  input RolePatch {
    name: String
    description: String
  }
`
