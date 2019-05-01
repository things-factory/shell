import { getRepository } from 'typeorm'
import { Publisher } from '../../../entities'

export const publisherResolver = {
  async publisher(_, { id }, context, info) {
    const repository = getRepository(Publisher)

    return await repository.findOne(
      { id },
      {
        relations: ['datasource']
      }
    )
  }
}
