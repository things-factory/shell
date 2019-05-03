import { gql } from 'apollo-server-koa'

export const CommonCodeDetail = gql`
  type CommonCodeDetail {
    rank: String
    name: String
    description: String
    parent: CommonCode
  }
`
