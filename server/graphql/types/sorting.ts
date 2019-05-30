import { gql } from 'apollo-server-koa'

export const Sorting = gql`
  input Sorting {
    name: String
    desc: Boolean
  }
`
