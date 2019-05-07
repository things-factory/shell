import { getRepository } from 'typeorm'
import { UsersRole } from '../../../entities'

export const usersRolesResolver = {
  async usersRoles() {
    const repository = getRepository(UsersRole)

    return await repository.find()
  }
}
