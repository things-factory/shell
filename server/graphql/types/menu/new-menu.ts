import { gql } from 'apollo-server-koa'

export const NewMenu = gql`
  input NewMenu {
    name: String!
  }
`
