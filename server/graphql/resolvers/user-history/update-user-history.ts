import { getRepository } from 'typeorm'
import { UserHistory } from '../../../entities'

export const updateUserHistory = {
  async updateUserHistory(_, { id, patch }) {
    const repository = getRepository(UserHistory)

    const userHistory = await repository.findOne({ id })

    return await repository.save({
      ...userHistory,
      ...patch
    })
  }
}
