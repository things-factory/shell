import { gql } from 'apollo-server-koa'

export const Resource = gql`
  type Resource {
    id: String
    domainId: String
    name: String
    children: [Resource]
    createdAt: String
    updatedAt: String
  }
`
