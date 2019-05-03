import { gql } from 'apollo-server-koa'

export const DomainPatch = gql`
  input DomainPatch {
    name: String
    description: String
    subdomain: String
    systemFlag: Boolean
  }
`
