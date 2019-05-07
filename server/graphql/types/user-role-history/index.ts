import { UserRoleHistory } from './user-role-history'
import { NewUserRoleHistory } from './new-user-role-history'
import { UserRoleHistoryPatch } from './user-role-history-patch'

export const Mutation = `
  createUserRoleHistory (
    userRoleHistory: NewUserRoleHistory!
  ): UserRoleHistory

  updateUserRoleHistory (
    name: String!
    patch: UserRoleHistoryPatch!
  ): UserRoleHistory

  deleteUserRoleHistory (
    name: String!
  ): UserRoleHistory
`

export const Query = `
  userRoleHistories: [UserRoleHistory]
  userRoleHistory(name: String!): UserRoleHistory
`

export const Types = [UserRoleHistory, NewUserRoleHistory, UserRoleHistoryPatch]
