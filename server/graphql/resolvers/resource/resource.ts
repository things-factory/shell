import { getRepository } from 'typeorm'
import { Resource } from '../../../entities'

export const resourceResolver = {
  async resource(_, { name }, context, info) {
    const repository = getRepository(Resource)

    return await repository.findOne(
      { name },
      {
        relations: ['children']
      }
    )
  }
}
