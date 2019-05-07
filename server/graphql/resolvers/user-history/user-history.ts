import { getRepository } from 'typeorm'
import { UserHistory } from '../../../entities'

export const userHistoryResolver = {
  async userHistory(_, { id }, context, info) {
    const repository = getRepository(UserHistory)

    return await repository.findOne({ id })
  }
}
