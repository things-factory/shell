import { getRepository } from 'typeorm'
import { ResourceColumn } from '../../../entities'

export const updateResourceColumn = {
  async updateResourceColumn(_, { id, patch }) {
    const repository = getRepository(ResourceColumn)

    const resourceColumn = await repository.findOne(
      {
        id
      },
      { relations: ['resource'] }
    )

    return await repository.save({
      ...resourceColumn,
      ...patch
    })
  }
}
