import { getRepository } from 'typeorm'
import { ResourceColumn } from '../../../entities'

export const deleteResourceColumn = {
  async deleteResourceColumn(_, { id }) {
    const repository = getRepository(ResourceColumn)

    return await repository.delete(id)
  }
}
