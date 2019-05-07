import { userHistoryResolver } from './user-history'
import { userHistoriesResolver } from './user-histories'

import { updateUserHistory } from './update-user-history'
import { createUserHistory } from './create-user-history'
import { deleteUserHistory } from './delete-user-history'

export const Query = {
  ...userHistoriesResolver,
  ...userHistoryResolver
}

export const Mutation = {
  ...updateUserHistory,
  ...createUserHistory,
  ...deleteUserHistory
}
