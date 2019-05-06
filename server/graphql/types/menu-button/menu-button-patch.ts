import { gql } from 'apollo-server-koa'

export const MenuButtonPatch = gql`
  input MenuButtonPatch {
    name: String
  }
`
