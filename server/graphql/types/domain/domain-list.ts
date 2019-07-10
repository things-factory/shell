import { gql } from 'apollo-server-koa'

export const DomainList = gql`
  type DomainList {
    items: [Domain]
    total: Int
  }
`
