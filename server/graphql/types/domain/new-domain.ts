import { gql } from 'apollo-server-koa'

export const NewDomain = gql`
  input NewDomain {
    name: String!
    subdomain: String!
  }
`
