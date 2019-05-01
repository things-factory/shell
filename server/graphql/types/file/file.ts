import { gql } from 'apollo-server-koa'

export const File = gql`
  type File {
    id: String
    filename: String
    encoding: String
    mimetype: String
    path: String
    createdAt: String
    updatedAt: String
  }
`
