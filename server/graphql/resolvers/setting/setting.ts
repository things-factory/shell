import { getRepository } from 'typeorm'
import { Setting } from '../../../entities'

export const settingResolver = {
  async setting(_, { name }, context, info) {
    const repository = getRepository(Setting)

    return await repository.findOne({ name })
  }
}
