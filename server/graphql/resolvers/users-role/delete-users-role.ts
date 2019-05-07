import { getRepository } from 'typeorm'
import { UsersRole } from '../../../entities'

export const deleteUsersRole = {
  async deleteUsersRole(_, { name, patch }) {
    const repository = getRepository(UsersRole)

    return await repository.delete(name)
  }
}
