import { boardResolver } from './board'
import { boardsResolver } from './boards'

import { publishBoard } from './publish-board'
import { updateBoard } from './update-board'
import { createBoard } from './create-board'
import { deleteBoard } from './delete-board'

export const Query = {
  ...boardsResolver,
  ...boardResolver
}

export const Mutation = {
  ...publishBoard,
  ...updateBoard,
  ...createBoard,
  ...deleteBoard
}
