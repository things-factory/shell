import { getRepository } from 'typeorm'
import { Board, Group } from '../../../entities'

export const joinGroup = {
  async joinGroup(_, { id, boardIds }) {
    const repository = getRepository(Group)
    const group = await repository.findOne({ id })

    const boardRepository = getRepository(Board)

    await boardIds.forEach(async boardId => {
      let board = await boardRepository.findOne({ id: boardId })
      board.group = group
      await boardRepository.save(board)
    })

    return await repository.findOne(
      { id },
      {
        relations: ['boards']
      }
    )
  }
}
