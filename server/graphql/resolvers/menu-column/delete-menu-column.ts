import { getRepository } from 'typeorm'
import { MenuColumn } from '../../../entities'

export const deleteMenuColumn = {
  async deleteMenuColumn(_, { id }) {
    const repository = getRepository(MenuColumn)

    return await repository.delete(id)
  }
}
