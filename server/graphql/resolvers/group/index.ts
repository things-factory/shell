import { groupResolver } from './group'
import { groupsResolver } from './groups'

import { updateGroup } from './update-group'
import { createGroup } from './create-group'
import { deleteGroup } from './delete-group'
import { joinGroup } from './join-group'

export const Query = {
  ...groupsResolver,
  ...groupResolver
}

export const Mutation = {
  ...updateGroup,
  ...createGroup,
  ...deleteGroup,
  ...joinGroup
}
