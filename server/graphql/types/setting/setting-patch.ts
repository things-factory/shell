import { gql } from 'apollo-server-koa'

export const SettingPatch = gql`
  input SettingPatch {
    name: String
    value: String
  }
`
