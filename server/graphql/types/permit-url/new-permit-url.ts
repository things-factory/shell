import { gql } from 'apollo-server-koa'

export const NewPermitUrl = gql`
  input NewPermitUrl {
    name: String!
  }
`
