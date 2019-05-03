import { getRepository } from 'typeorm'
import { Resource } from '../../../entities'

export const resourcesResolver = {
  async resources() {
    const repository = getRepository(Resource)

    return await repository.find()
  }
}
