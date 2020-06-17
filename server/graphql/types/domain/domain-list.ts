import gql from 'graphql-tag'
import type { Domain } from '../../../entities'

export type DomainList = {
  items: Domain[]
  total: number
}

export const DomainList = gql`
  type DomainList {
    items: [Domain]
    total: Int
  }
`
