import { userRoleHistoryResolver } from './user-role-history'
import { userRoleHistoriesResolver } from './user-role-histories'

import { updateUserRoleHistory } from './update-user-role-history'
import { createUserRoleHistory } from './create-user-role-history'
import { deleteUserRoleHistory } from './delete-user-role-history'

export const Query = {
  ...userRoleHistoriesResolver,
  ...userRoleHistoryResolver
}

export const Mutation = {
  ...updateUserRoleHistory,
  ...createUserRoleHistory,
  ...deleteUserRoleHistory
}
