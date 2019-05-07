import { getRepository } from 'typeorm'
import { UsersRole } from '../../../entities'

export const usersRoleResolver = {
  async usersRole(_, { id }, context, info) {
    const repository = getRepository(UsersRole)

    return await repository.findOne({ id })
  }
}
