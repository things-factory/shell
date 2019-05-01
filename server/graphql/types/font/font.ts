import { gql } from 'apollo-server-koa'

export const Font = gql`
  type Font {
    name: String
    provider: String
    uri: String
    path: String
    active: Boolean
    createdAt: String
    updatedAt: String
  }
`
