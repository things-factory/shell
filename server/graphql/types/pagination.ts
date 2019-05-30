import { gql } from 'apollo-server-koa'

export const Pagination = gql`
  input Pagination {
    skip: Int
    take: Int
  }
`
