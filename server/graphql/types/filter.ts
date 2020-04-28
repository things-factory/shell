import gql from 'graphql-tag'
import { AnyScalar } from './any-scalar'

export type Filter = {
  name: string
  operator?: string
  value: AnyScalar
  relation?: boolean
}

export const Filter = gql`
  scalar AnyScalar

  input Filter {
    name: String
    operator: String
    value: AnyScalar
    relation: Boolean
  }
`
