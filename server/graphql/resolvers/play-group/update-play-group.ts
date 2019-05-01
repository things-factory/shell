import { getRepository } from 'typeorm'
import { PlayGroup } from '../../../entities'

export const updatePlayGroup = {
  async updatePlayGroup(_, { id, patch }) {
    const repository = getRepository(PlayGroup)

    const playGroup = await repository.findOne(
      { id },
      {
        relations: ['boards']
      }
    )

    return await repository.save({
      ...playGroup,
      ...patch
    })
  }
}
