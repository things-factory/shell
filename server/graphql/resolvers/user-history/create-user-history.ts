import { getRepository } from 'typeorm'
import { UserHistory } from '../../../entities'

export const createUserHistory = {
  async createUserHistory(_, { userHistory: attrs }) {
    const repository = getRepository(UserHistory)

    return await repository.save({ ...attrs })
  }
}
