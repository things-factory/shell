import { getRepository } from 'typeorm'
import { Group } from '../../../entities'

export const updateGroup = {
  async updateGroup(_, { id, patch }) {
    const repository = getRepository(Group)

    const group = await repository.findOne(
      { id },
      {
        relations: ['boards']
      }
    )

    return await repository.save({
      ...group,
      ...patch
    })
  }
}
