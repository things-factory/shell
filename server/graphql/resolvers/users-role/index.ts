import { usersRoleResolver } from './users-role'
import { usersRolesResolver } from './users-roles'

import { updateUsersRole } from './update-users-role'
import { createUsersRole } from './create-users-role'
import { deleteUsersRole } from './delete-users-role'

export const Query = {
  ...usersRolesResolver,
  ...usersRoleResolver
}

export const Mutation = {
  ...updateUsersRole,
  ...createUsersRole,
  ...deleteUsersRole
}
