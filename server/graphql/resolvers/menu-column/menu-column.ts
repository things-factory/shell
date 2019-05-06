import { getRepository } from 'typeorm'
import { MenuColumn } from '../../../entities'

export const menuColumnResolver = {
  async menuColumn(_, { id }, context, info) {
    const repository = getRepository(MenuColumn)

    return await repository.findOne(
      {
        id
      },
      {
        relations: ['menu']
      }
    )
  }
}
