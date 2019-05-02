import { getRepository } from 'typeorm'
import { Menu } from '../../../entities'

export const menusResolver = {
  async menus() {
    const repository = getRepository(Menu)

    return await repository.find()
  }
}
