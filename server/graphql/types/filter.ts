import { gql } from 'apollo-server-koa'
import { AnyScalarType } from './any-scalar'

export const Filter = gql`
  scalar AnyScalar

  input Filter {
    name: String
    operator: String
    value: AnyScalar
  }
`
