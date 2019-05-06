import { getRepository } from 'typeorm'
import { Menu } from '../../../entities'

export const updateMenu = {
  async updateMenu(_, { id, patch }) {
    const repository = getRepository(Menu)

    const menu = await repository.findOne(
      { id },
      {
        relations: ['children', 'buttons']
      }
    )

    return await repository.save({
      ...menu,
      ...patch
    })
  }
}
