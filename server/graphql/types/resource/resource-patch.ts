import { gql } from 'apollo-server-koa'

export const ResourcePatch = gql`
  input ResourcePatch {
    name: String
  }
`
