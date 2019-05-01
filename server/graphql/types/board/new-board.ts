import { gql } from 'apollo-server-koa'

export const NewBoard = gql`
  input NewBoard {
    name: String!
    description: String
    model: String!
    fit: String
    width: Int
    height: Int
    published: Boolean
  }
`
