import { getRepository } from 'typeorm'
import { UsersRole } from '../../../entities'

export const updateUsersRole = {
  async updateUsersRole(_, { id, patch }) {
    const repository = getRepository(UsersRole)

    const usersRole = await repository.findOne({ id })

    return await repository.save({
      ...usersRole,
      ...patch
    })
  }
}
