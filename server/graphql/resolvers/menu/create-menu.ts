import uuid from 'uuid/v4'

import { getRepository } from 'typeorm'
import { Menu } from '../../../entities'

export const createMenu = {
  async createMenu(_, { menu: attrs }) {
    const repository = getRepository(Menu)
    const newMenu = {
      id: uuid(),
      ...attrs
    }

    return await repository.save(newMenu)
  }
}
