import { getRepository } from 'typeorm'
import { Group } from '../../../entities'

export const groupResolver = {
  async group(_, { id }, context, info) {
    const repository = getRepository(Group)

    return await repository.findOne(
      { id },
      {
        relations: ['boards']
      }
    )
  }
}
