import { getRepository } from 'typeorm'
import { MenuButton } from '../../../entities'

export const menuButtonResolver = {
  async menuButton(_, { id }, context, info) {
    const repository = getRepository(MenuButton)

    return await repository.findOne(
      {
        id
      },
      {
        relations: ['menu']
      }
    )
  }
}
