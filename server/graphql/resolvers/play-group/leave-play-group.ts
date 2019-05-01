import { getRepository } from 'typeorm'
import { Board, PlayGroup } from '../../../entities'

export const leavePlayGroup = {
  async leavePlayGroup(_, { id, boardIds }) {
    const repository = getRepository(PlayGroup)
    const playGroup = await repository.findOne(
      { id },
      {
        relations: ['boards']
      }
    )

    const boardIdList = playGroup.boards.map(board => board.id)
    boardIds.forEach(boardId => {
      let index = boardIdList.indexOf(boardId)
      if (index !== -1) {
        boardIdList.splice(index, 1)
      }
    })

    const boardRepository = getRepository(Board)
    playGroup.boards = await boardRepository.findByIds(boardIdList)

    return await repository.save(playGroup)
  }
}
