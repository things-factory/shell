import { getRepository } from 'typeorm'
import { Menu } from '../../../entities'

export const menuResolver = {
  async menu(_, { id }, context, info) {
    const repository = getRepository(Menu)

    return await repository.findOne(
      { id },
      {
        relations: ['children']
      }
    )
  }
}
