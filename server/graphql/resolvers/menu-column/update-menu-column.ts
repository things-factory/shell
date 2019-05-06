import { getRepository } from 'typeorm'
import { MenuColumn } from '../../../entities'

export const updateMenuColumn = {
  async updateMenuColumn(_, { id, patch }) {
    const repository = getRepository(MenuColumn)

    const menuColumn = await repository.findOne(
      {
        id
      },
      { relations: ['menu'] }
    )

    return await repository.save({
      ...menuColumn,
      ...patch
    })
  }
}
