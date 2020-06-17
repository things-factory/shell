import gql from 'graphql-tag'

export type Pagination = {
  page?: number
  limit?: number
}

export const Pagination = gql`
  input Pagination {
    page: Int
    limit: Int
  }
`
