import { commonCodeDetailResolver } from './common-code-detail'
import { commonCodeDetailsResolver } from './common-code-details'

import { updateBoard } from './update-common-code-detail'
import { createBoard } from './create-common-code-detail'
import { deleteBoard } from './delete-common-code-detail'

export const Query = {
  ...commonCodeDetailsResolver,
  ...commonCodeDetailResolver
}

export const Mutation = {
  ...updateBoard,
  ...createBoard,
  ...deleteBoard
}
