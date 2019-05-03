import uuid from 'uuid/v4'

import { getRepository } from 'typeorm'
import { Group, Board } from '../../../entities'

import { thumbnail } from '../../../controllers/thumbnail'

export const createBoard = {
  async createBoard(_, { board: attrs, groupId }) {
    const repository = getRepository(Board)
    const newBoard = {
      id: uuid(),
      ...attrs
    }

    const groupRepository = getRepository(Group)
    newBoard.group = await groupRepository.findOne({
      id: groupId
    })

    const base64 = await thumbnail({
      model: attrs.model
    })

    newBoard.thumbnail = 'data:image/png;base64,' + base64.toString('base64')

    return await repository.save(newBoard)
  }
}
