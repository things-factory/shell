import { PlayGroup } from './play-group'
import { NewPlayGroup } from './new-play-group'
import { PlayGroupPatch } from './play-group-patch'

export const Mutation = `
  createPlayGroup (
    playGroup: NewPlayGroup!
  ): PlayGroup

  updatePlayGroup (
    id: String!
    patch: PlayGroupPatch!
  ): PlayGroup

  deletePlayGroup (
    id: String!
  ): PlayGroup

  joinPlayGroup (
    id: String!
    boardIds: [String]!
  ): PlayGroup
  
  leavePlayGroup (
    id: String!
    boardIds: [String]!
  ): PlayGroup
`

export const Query = `
  playGroups: [PlayGroup]
  playGroup(id: String!): PlayGroup
`

export const Types = [PlayGroup, NewPlayGroup, PlayGroupPatch]
