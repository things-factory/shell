import { getRepository } from 'typeorm'
import { UserRoleHistory } from '../../../entities'

export const userRoleHistoryResolver = {
  async userRoleHistory(_, { id }, context, info) {
    const repository = getRepository(UserRoleHistory)

    return await repository.findOne({ id })
  }
}
