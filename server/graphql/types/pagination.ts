import { gql } from 'apollo-server-koa'

export const Pagination = gql`
  input Pagination {
    page: Int
    limit: Int
  }
`
