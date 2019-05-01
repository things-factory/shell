import { gql } from 'apollo-server-koa'

export const DataSource = gql`
  type DataSource {
    id: String
    name: String
    description: String
    publishers: [Publisher]
    createdAt: String
    updatedAt: String
  }
`
