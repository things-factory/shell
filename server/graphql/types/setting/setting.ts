import { gql } from 'apollo-server-koa'

export const Setting = gql`
  type Setting {
    name: String
    value: String
    createdAt: String
    updatedAt: String
  }
`
