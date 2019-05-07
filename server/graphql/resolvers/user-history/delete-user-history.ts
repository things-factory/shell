import { getRepository } from 'typeorm'
import { UserHistory } from '../../../entities'

export const deleteUserHistory = {
  async deleteUserHistory(_, { name, patch }) {
    const repository = getRepository(UserHistory)

    return await repository.delete(name)
  }
}
