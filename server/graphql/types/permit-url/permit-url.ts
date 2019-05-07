import { gql } from 'apollo-server-koa'

export const PermitUrl = gql`
  type PermitUrl {
    name: String
    description: String
    createdAt: String
    updatedAt: String
  }
`
