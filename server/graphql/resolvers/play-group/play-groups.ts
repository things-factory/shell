import { getRepository } from 'typeorm'
import { PlayGroup } from '../../../entities'

export const playGroupsResolver = {
  async playGroups() {
    const repository = getRepository(PlayGroup)

    return await repository.find()
  }
}
