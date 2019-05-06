import { getRepository } from 'typeorm'
import { Menu } from '../../../entities'

export const menuResolver = {
  async menu(_, { name }, context, info) {
    const repository = getRepository(Menu)

    return await repository.findOne(
      { name },
      {
        relations: ['domain', 'parent', 'children', 'buttons', 'columns']
      }
    )
  }
}
