import { gql } from 'apollo-server-koa'

export const NewDomain = gql`
  input NewDomain {
    name: String!
    description: String
    timezone: String
    systemFlag: Boolean
    subdomain: String!
    brandName: String
    brandImage: String
    contentImage: String
    theme: String
  }
`
