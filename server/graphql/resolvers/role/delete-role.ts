import { getRepository } from 'typeorm'
import { Role } from '../../../entities'

export const deleteRole = {
  async deleteRole(_, { name, patch }) {
    const repository = getRepository(Role)

    return await repository.delete(name)
  }
}
