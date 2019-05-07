import uuid from 'uuid/v4'

import { getRepository } from 'typeorm'
import { PermitUrl } from '../../../entities'

export const createPermitUrl = {
  async createPermitUrl(_, { menu: attrs }) {
    const repository = getRepository(PermitUrl)
    const newPermitUrl = {
      id: uuid(),
      ...attrs
    }

    return await repository.save(newPermitUrl)
  }
}
