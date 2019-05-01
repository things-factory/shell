import { getRepository } from 'typeorm'
import { Board } from '../../../entities'

export const boardsResolver = {
  async boards() {
    const repository = getRepository(Board)

    return await repository.find()
  }
}
