import { gql } from 'apollo-server-koa'

export const ListParam = gql`
  input ListParam {
    filters: [Filter]
    pagination: Pagination
    sortings: [Sorting]
  }
`
