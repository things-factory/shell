import { getRepository } from 'typeorm'
import { Setting } from '../../../entities'

export const settingsResolver = {
  async settings() {
    const repository = getRepository(Setting)

    return await repository.find()
  }
}
