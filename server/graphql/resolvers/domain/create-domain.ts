import uuid from 'uuid/v4'

import { getRepository } from 'typeorm'
import { Domain } from '../../../entities'

export const createDomain = {
  async createDomain(_, { menu: attrs }) {
    const repository = getRepository(Domain)
    const newDomain = {
      id: uuid(),
      ...attrs
    }

    return await repository.save(newDomain)
  }
}
