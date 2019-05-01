import { gql } from 'apollo-server-koa'

export const PlayGroupPatch = gql`
  input PlayGroupPatch {
    name: String
    description: String
  }
`
