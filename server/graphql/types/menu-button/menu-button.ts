import { gql } from 'apollo-server-koa'

export const MenuButton = gql`
  type MenuButton {
    id: String
    domain: Domain
    name: String
    menu: Menu
    createdAt: String
    updatedAt: String
  }
`
