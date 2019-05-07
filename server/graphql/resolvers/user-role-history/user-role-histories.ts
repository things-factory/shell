import { getRepository } from 'typeorm'
import { UserRoleHistory } from '../../../entities'

export const userRoleHistoriesResolver = {
  async userRoleHistories() {
    const repository = getRepository(UserRoleHistory)

    return await repository.find()
  }
}
