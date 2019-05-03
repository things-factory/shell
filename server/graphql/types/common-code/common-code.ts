import { gql } from 'apollo-server-koa'

export const CommonCode = gql`
  type CommonCode {
    id: String
    name: String
    domainId: String
    description: String
    commonCodeDetails: CommonCodeDetail
  }
`
