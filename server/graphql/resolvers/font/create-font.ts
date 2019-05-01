import { getRepository } from 'typeorm'
import { Font } from '../../../entities'

export const createFont = {
  async createFont(_, { font: attrs }) {
    const repository = getRepository(Font)

    return await repository.save({ ...attrs })
  }
}
