import { getRepository } from 'typeorm'
import { UserRoleHistory } from '../../../entities'

export const createUserRoleHistory = {
  async createUserRoleHistory(_, { userRoleHistory: attrs }) {
    const repository = getRepository(UserRoleHistory)

    return await repository.save({ ...attrs })
  }
}
