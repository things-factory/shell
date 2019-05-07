import { getRepository } from 'typeorm'
import { UserHistory } from '../../../entities'

export const userHistoriesResolver = {
  async userHistories() {
    const repository = getRepository(UserHistory)

    return await repository.find()
  }
}
