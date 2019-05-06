import uuid from 'uuid/v4'

import { getRepository } from 'typeorm'
import { MenuButton } from '../../../entities'

export const createMenuButton = {
  async createMenuButton(_, { menuButton: attrs }) {
    const repository = getRepository(MenuButton)
    const newMenuButton = {
      id: uuid(),
      ...attrs
    }

    return await repository.save(newMenuButton)
  }
}
