import { gql } from 'apollo-server-koa'

export const NewMenuButton = gql`
  input NewMenuButton {
    name: String!
  }
`
