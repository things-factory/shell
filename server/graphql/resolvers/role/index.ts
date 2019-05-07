import { roleResolver } from './role'
import { rolesResolver } from './roles'

import { updateRole } from './update-role'
import { createRole } from './create-role'
import { deleteRole } from './delete-role'

export const Query = {
  ...rolesResolver,
  ...roleResolver
}

export const Mutation = {
  ...updateRole,
  ...createRole,
  ...deleteRole
}
