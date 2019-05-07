import { gql } from 'apollo-server-koa'

export const ResourceColumn = gql`
  type ResourceColumn {
    id: String
    domain: Domain
    name: String
    menu: Resource
    createdAt: String
    updatedAt: String
  }
`
