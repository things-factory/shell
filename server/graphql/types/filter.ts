import { gql } from 'apollo-server-koa'

export const Filter = gql`
  input Filter {
    name: String
    operator: String
    value: String
  }
`
