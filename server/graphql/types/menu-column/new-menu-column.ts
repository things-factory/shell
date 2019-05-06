import { gql } from 'apollo-server-koa'

export const NewMenuColumn = gql`
  input NewMenuColumn {
    name: String!
  }
`
