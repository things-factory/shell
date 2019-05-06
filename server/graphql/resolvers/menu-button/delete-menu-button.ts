import { getRepository } from 'typeorm'
import { MenuButton } from '../../../entities'

export const deleteMenuButton = {
  async deleteMenuButton(_, { id }) {
    const repository = getRepository(MenuButton)

    return await repository.delete(id)
  }
}
