import gql from 'graphql-tag'

export const ListParam = gql`
  input ListParam {
    filters: [Filter]
    pagination: Pagination
    sortings: [Sorting]
  }
`
