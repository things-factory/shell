import { gql } from 'apollo-server-koa'

export const PlayGroup = gql`
  type PlayGroup {
    id: String
    name: String
    description: String
    boards: [Board]
    createdAt: String
    updatedAt: String
  }
`
