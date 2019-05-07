import { gql } from 'apollo-server-koa'

export const UserRoleHistoryPatch = gql`
  input UserRoleHistoryPatch {
    name: String
  }
`
