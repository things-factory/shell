import { getRepository } from 'typeorm'
import { Board } from '../../../entities'

export const boardResolver = {
  async board(_, { id }, context, info) {
    const repository = getRepository(Board)

    return await repository.findOne(
      { id },
      {
        relations: ['group']
      }
    )
  }
}
