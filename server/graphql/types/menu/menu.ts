import { gql } from 'apollo-server-koa'

export const Menu = gql`
  type Menu {
    id: String
    name: String
    children: [Menu]
    createdAt: String
    updatedAt: String
  }
`
