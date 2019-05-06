import { getRepository } from 'typeorm'
import { MenuButton } from '../../../entities'

export const updateMenuButton = {
  async updateMenuButton(_, { id, patch }) {
    const repository = getRepository(MenuButton)

    const menuButton = await repository.findOne(
      {
        id
      },
      { relations: ['menu'] }
    )

    return await repository.save({
      ...menuButton,
      ...patch
    })
  }
}
