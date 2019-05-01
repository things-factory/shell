import { gql } from 'apollo-server-koa'

export const Publisher = gql`
  type Publisher {
    id: String
    name: String
    description: String
    rule: String
    type: String
    started: Boolean
    datasource: DataSource
    createdAt: String
    updatedAt: String
  }
`
