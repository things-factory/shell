import uuid from 'uuid/v4'

import { getRepository } from 'typeorm'
import { ResourceColumn } from '../../../entities'

export const createResourceColumn = {
  async createResourceColumn(_, { resourceColumn: attrs }) {
    const repository = getRepository(ResourceColumn)
    const newResourceColumn = {
      id: uuid(),
      ...attrs
    }

    return await repository.save(newResourceColumn)
  }
}
