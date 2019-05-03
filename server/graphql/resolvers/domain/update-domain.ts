import { getRepository } from 'typeorm'
import { Domain } from '../../../entities/domain'

export const updateDomain = {
  async updateDomain(_, { id, patch }) {
    const repository = getRepository(Domain)

    const domain = await repository.findOne({ id })

    return await repository.save({
      ...domain,
      ...patch
    })
  }
}
