import { gql } from 'apollo-server-koa'

export const GroupPatch = gql`
  input GroupPatch {
    name: String
    description: String
  }
`
