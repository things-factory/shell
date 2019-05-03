import { getRepository } from 'typeorm'
import { Resource } from '../../../entities'

export const updateResource = {
  async updateResource(_, { id, patch }) {
    const repository = getRepository(Resource)

    const resource = await repository.findOne(
      { id },
      {
        relations: ['children']
      }
    )

    return await repository.save({
      ...resource,
      ...patch
    })
  }
}
