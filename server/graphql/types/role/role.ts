import { gql } from 'apollo-server-koa'

export const Role = gql`
  type Role {
    name: String
    description: String
    createdAt: String
    updatedAt: String
  }
`
