import { gql } from 'apollo-server-koa'

export const NewResourceColumn = gql`
  input NewResourceColumn {
    name: String!
  }
`
