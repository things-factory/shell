import { getRepository } from 'typeorm'
import { UsersRole } from '../../../entities'

export const createUsersRole = {
  async createUsersRole(_, { usersRole: attrs }) {
    const repository = getRepository(UsersRole)

    return await repository.save({ ...attrs })
  }
}
