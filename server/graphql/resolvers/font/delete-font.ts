import { getRepository } from 'typeorm'
import { Font } from '../../../entities'

export const deleteFont = {
  async deleteFont(_, { name }) {
    const repository = getRepository(Font)

    return await repository.delete(name)
  }
}
