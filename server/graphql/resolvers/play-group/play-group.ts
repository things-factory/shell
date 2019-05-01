import { getRepository } from 'typeorm'
import { PlayGroup } from '../../../entities'

export const playGroupResolver = {
  async playGroup(_, { id }, context, info) {
    const repository = getRepository(PlayGroup)

    return await repository.findOne(
      { id },
      {
        relations: ['boards']
      }
    )
  }
}
