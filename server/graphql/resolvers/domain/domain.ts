import { getRepository } from 'typeorm'
import { Domain } from '../../../entities'

export const domainResolver = {
  async domain(_, { name }, context, info) {
    const repository = getRepository(Domain)

    return await repository.findOne({ name })
  }
}
