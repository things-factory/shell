import { gql } from 'apollo-server-koa'

export const Group = gql`
  type Group {
    id: String
    name: String
    description: String
    boards: [Board]
    createdAt: String
    updatedAt: String
  }
`
