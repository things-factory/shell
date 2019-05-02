import { gql } from 'apollo-server-koa'

export const MenuPatch = gql`
  input MenuPatch {
    name: String
  }
`
