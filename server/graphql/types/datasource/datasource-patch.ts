import { gql } from 'apollo-server-koa'

export const DataSourcePatch = gql`
  input DataSourcePatch {
    name: String
    description: String
  }
`
