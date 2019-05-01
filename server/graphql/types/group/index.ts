import { Group } from './group'
import { NewGroup } from './new-group'
import { GroupPatch } from './group-patch'

export const Mutation = `
  createGroup (
    group: NewGroup!
  ): Group

  updateGroup (
    id: String!
    patch: GroupPatch!
  ): Group

  deleteGroup (
    id: String!
  ): Group

  joinGroup (
    id: String!
    boardIds: [String]!
  ): Group
`

export const Query = `
  groups: [Group]
  group(id: String!): Group
`

export const Types = [Group, NewGroup, GroupPatch]
