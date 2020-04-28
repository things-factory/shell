import gql from 'graphql-tag'
import type { Filter } from './filter'
import type { Pagination } from './pagination'
import type { Sorting } from './sorting'

export type ListParam = {
  filters?: Filter[]
  pagination?: Pagination
  sortings?: Sorting[]
}

export const ListParam = gql`
  input ListParam {
    filters: [Filter]
    pagination: Pagination
    sortings: [Sorting]
  }
`
