import { gql } from 'apollo-server-koa'

export const ResourceColumnPatch = gql`
  input ResourceColumnPatch {
    name: String
  }
`
