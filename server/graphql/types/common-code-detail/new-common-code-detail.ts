import { gql } from 'apollo-server-koa'

export const NewCommonCodeDetail = gql`
  input NewCommonCodeDetail {
    rank: Int!
    name: String!
    description: String!
    parentId: String!
  }
`
