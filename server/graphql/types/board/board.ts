import { gql } from 'apollo-server-koa'

export const Board = gql`
  type Board {
    id: String
    name: String
    description: String
    model: String
    fit: String
    width: Int
    height: Int
    thumbnail: String
    published: Boolean
    group: Group
    createdAt: String
    updatedAt: String
  }
`
