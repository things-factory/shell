import { getRepository } from 'typeorm'
import { Role } from '../../../entities'

export const createRole = {
  async createRole(_, { role: attrs }) {
    const repository = getRepository(Role)

    return await repository.save({ ...attrs })
  }
}
