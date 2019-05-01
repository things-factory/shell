import { playGroupResolver } from './play-group'
import { playGroupsResolver } from './play-groups'

import { updatePlayGroup } from './update-play-group'
import { createPlayGroup } from './create-play-group'
import { deletePlayGroup } from './delete-play-group'
import { joinPlayGroup } from './join-play-group'
import { leavePlayGroup } from './leave-play-group'

export const Query = {
  ...playGroupsResolver,
  ...playGroupResolver
}

export const Mutation = {
  ...updatePlayGroup,
  ...createPlayGroup,
  ...deletePlayGroup,
  ...joinPlayGroup,
  ...leavePlayGroup
}
