import { gql } from 'apollo-server-koa'

export const MenuColumnPatch = gql`
  input MenuColumnPatch {
    name: String
  }
`
