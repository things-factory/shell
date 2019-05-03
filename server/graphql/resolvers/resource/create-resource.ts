import uuid from 'uuid/v4'

import { getRepository } from 'typeorm'
import { Resource } from '../../../entities'

export const createResource = {
  async createResource(_, { menu: attrs }) {
    const repository = getRepository(Resource)
    const newResource = {
      id: uuid(),
      ...attrs
    }

    return await repository.save(newResource)
  }
}
