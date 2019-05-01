import { getRepository } from 'typeorm'
import { Setting } from '../../../entities'

export const createSetting = {
  async createSetting(_, { setting: attrs }) {
    const repository = getRepository(Setting)

    return await repository.save({ ...attrs })
  }
}
