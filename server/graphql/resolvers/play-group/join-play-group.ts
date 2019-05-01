import { getRepository } from 'typeorm'
import { Board, PlayGroup } from '../../../entities'

export const joinPlayGroup = {
  async joinPlayGroup(_, { id, boardIds }) {
    const repository = getRepository(PlayGroup)
    const playGroup = await repository.findOne(
      { id },
      {
        relations: ['boards']
      }
    )

    const boardIdList = playGroup.boards.map(board => board.id)
    boardIds.forEach(boardId => {
      if (boardIdList.indexOf(boardId) == -1) {
        boardIdList.push(boardId)
      }
    })

    const boardRepository = getRepository(Board)
    playGroup.boards = await boardRepository.findByIds(boardIdList)

    return await repository.save(playGroup)
  }
}
