import { getRepository } from 'typeorm'
import { ResourceColumn } from '../../../entities'

export const resourceColumnResolver = {
  async resourceColumn(_, { id }, context, info) {
    const repository = getRepository(ResourceColumn)

    return await repository.findOne(
      {
        id
      },
      {
        relations: ['resource']
      }
    )
  }
}
