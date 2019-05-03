import { gql } from 'apollo-server-koa'

export const CommonCodePatch = gql`
  input CommonCodePatch {
    name: String
    description: String
  }
`
