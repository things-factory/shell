import { gql } from 'apollo-server-koa'

export const DomainPatch = gql`
  input DomainPatch {
    name: String
    description: String
    timezone: String
    systemFlag: Boolean
    subdomain: String
    brandName: String
    brandImage: String
    contentImage: String
    theme: String
  }
`
