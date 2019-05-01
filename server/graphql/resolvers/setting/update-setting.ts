import { getRepository } from 'typeorm'
import { Setting } from '../../../entities'

export const updateSetting = {
  async updateSetting(_, { name, patch }) {
    const repository = getRepository(Setting)

    const setting = await repository.findOne({ name })

    return await repository.save({
      ...setting,
      ...patch
    })
  }
}
