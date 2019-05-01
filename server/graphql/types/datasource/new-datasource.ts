import { gql } from 'apollo-server-koa'

export const NewDataSource = gql`
  input NewDataSource {
    name: String!
    description: String
  }
`
