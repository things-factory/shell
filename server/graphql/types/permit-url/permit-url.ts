import { gql } from 'apollo-server-koa'

export const PermitUrl = gql`
  type PermitUrl {
    id: String
    name: String
  }
`
