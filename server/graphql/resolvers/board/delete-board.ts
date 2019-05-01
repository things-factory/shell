import { getRepository } from 'typeorm'
import { Board } from '../../../entities'

export const deleteBoard = {
  async deleteBoard(_, { id }) {
    const repository = getRepository(Board)

    return await repository.delete(id)
  }
}
