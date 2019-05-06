import { getRepository } from 'typeorm'
import { MenuButton } from '../../../entities'

export const menuButtonsResolver = {
  async menuButtons() {
    const repository = getRepository(MenuButton)

    return await repository.find()
  }
}
