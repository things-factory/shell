import { getRepository } from 'typeorm'
import { Resource } from '../../../entities'

export const deleteResource = {
  async deleteResource(_, { id }) {
    const repository = getRepository(Resource)

    return await repository.delete(id)
  }
}
