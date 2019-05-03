import { gql } from 'apollo-server-koa'

export const Menu = gql`
  type Menu {
    id: String
    domainId: String
    name: String
    children: [Menu]
    createdAt: String
    updatedAt: String
  }
`
