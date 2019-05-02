import { getRepository } from 'typeorm'
import { Menu } from '../../../entities'

export const deleteMenu = {
  async deleteMenu(_, { id }) {
    const repository = getRepository(Menu)

    return await repository.delete(id)
  }
}
