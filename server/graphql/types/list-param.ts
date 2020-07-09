import gql from 'graphql-tag'
import { Filter } from './filter'
import { Pagination } from './pagination'
import { Sorting } from './sorting'

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
