import { gql } from 'apollo-server-koa'

export const MenuColumn = gql`
  type MenuColumn {
    id: String
    domain: Domain
    name: String
    menu: Menu
    createdAt: String
    updatedAt: String
  }
`
