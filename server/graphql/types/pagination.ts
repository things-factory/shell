import gql from 'graphql-tag'

export const Pagination = gql`
  input Pagination {
    page: Int
    limit: Int
  }
`
