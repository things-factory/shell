import uuid from 'uuid/v4'

import { getRepository } from 'typeorm'
import { Group } from '../../../entities'

export const createGroup = {
  async createGroup(_, { group: attrs }) {
    const repository = getRepository(Group)

    const group = {
      id: uuid(),
      ...attrs
    }

    return await repository.save(group)
  }
}
