import { gql } from 'apollo-server-koa'

export const Domain = gql`
  type Domain {
    id: String
    name: String
    description: String
    subdomain: String
    systemFlag: Boolean
    createdAt: String
    updatedAt: String
  }
`
