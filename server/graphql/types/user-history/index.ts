import { UserHistory } from './user-history'
import { NewUserHistory } from './new-user-history'
import { UserHistoryPatch } from './user-history-patch'

export const Mutation = `
  createUserHistory (
    userHistory: NewUserHistory!
  ): UserHistory

  updateUserHistory (
    name: String!
    patch: UserHistoryPatch!
  ): UserHistory

  deleteUserHistory (
    name: String!
  ): UserHistory
`

export const Query = `
  userHistories: [UserHistory]
  userHistory(name: String!): UserHistory
`

export const Types = [UserHistory, NewUserHistory, UserHistoryPatch]
