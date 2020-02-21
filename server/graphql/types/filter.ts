import gql from 'graphql-tag'
import { AnyScalarType } from './any-scalar'

export const Filter = gql`
  scalar AnyScalar

  input Filter {
    name: String
    operator: String
    value: AnyScalar
    relation: Boolean
  }
`
