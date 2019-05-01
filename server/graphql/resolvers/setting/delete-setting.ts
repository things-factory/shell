import { getRepository } from 'typeorm'
import { Setting } from '../../../entities'

export const deleteSetting = {
  async deleteSetting(_, { name, patch }) {
    const repository = getRepository(Setting)

    return await repository.delete(name)
  }
}
