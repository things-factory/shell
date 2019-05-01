import { getRepository } from 'typeorm'
import { Board } from '../../../entities'

export const publishBoard = {
  async publishBoard(_, { id, published }) {
    const repository = getRepository(Board)

    const board = await repository.findOne(
      { id },
      {
        relations: ['group']
      }
    )

    board.published = !!published

    return await repository.save(board)
  }
}
