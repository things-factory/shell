import uuid from 'uuid/v4'

import { getRepository } from 'typeorm'
import { PlayGroup } from '../../../entities'

export const createPlayGroup = {
  async createPlayGroup(_, { playGroup: attrs }) {
    const repository = getRepository(PlayGroup)

    const playGroup = {
      id: uuid(),
      ...attrs
    }

    return await repository.save(playGroup)
  }
}
