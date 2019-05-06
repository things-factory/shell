import { gql } from 'apollo-server-koa'

export const Menu = gql`
  type Menu {
    id: String
    domain: Domain
    name: String
    children: [Menu]
    buttons: [MenuButton]
    columns: [MenuColumn]
    createdAt: String
    updatedAt: String
  }
`
