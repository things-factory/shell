import { getRepository } from 'typeorm'
import { UserRoleHistory } from '../../../entities'

export const deleteUserRoleHistory = {
  async deleteUserRoleHistory(_, { name, patch }) {
    const repository = getRepository(UserRoleHistory)

    return await repository.delete(name)
  }
}
