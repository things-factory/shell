import { userHistoryResolver } from './userHistory'
import { userHistoriesResolver } from './userHistories'

import { updateUserHistory } from './update-userHistory'
import { createUserHistory } from './create-userHistory'
import { deleteUserHistory } from './delete-userHistory'

export const Query = {
  ...userHistoriesResolver,
  ...userHistoryResolver
}

export const Mutation = {
  ...updateUserHistory,
  ...createUserHistory,
  ...deleteUserHistory
}
