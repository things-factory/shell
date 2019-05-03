import { getRepository } from 'typeorm'
import { Domain } from '../../../entities/domain'

export const deleteDomain = {
  async deleteDomain(_, { id }) {
    const repository = getRepository(Domain)

    return await repository.delete(id)
  }
}
