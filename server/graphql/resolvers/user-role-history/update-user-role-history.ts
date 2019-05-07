import { getRepository } from 'typeorm'
import { UserRoleHistory } from '../../../entities'

export const updateUserRoleHistory = {
  async updateUserRoleHistory(_, { id, patch }) {
    const repository = getRepository(UserRoleHistory)

    const userHistory = await repository.findOne({ id })

    return await repository.save({
      ...userHistory,
      ...patch
    })
  }
}
