import { gql } from 'apollo-server-koa'

export const Menu = gql`
  type Menu {
    name: String
    createdAt: String
    updatedAt: String
  }
`
