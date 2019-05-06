import uuid from 'uuid/v4'

import { getRepository } from 'typeorm'
import { MenuColumn } from '../../../entities'

export const createMenuColumn = {
  async createMenuColumn(_, { menuColumn: attrs }) {
    const repository = getRepository(MenuColumn)
    const newMenuColumn = {
      id: uuid(),
      ...attrs
    }

    return await repository.save(newMenuColumn)
  }
}
