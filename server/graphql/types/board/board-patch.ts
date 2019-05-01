import { gql } from 'apollo-server-koa'

export const BoardPatch = gql`
  input BoardPatch {
    name: String
    description: String
    model: String
    fit: String
    width: Int
    height: Int
    published: Boolean
  }
`
