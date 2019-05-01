import { getRepository } from 'typeorm'
import { User } from '../../../entities'

export const usersResolver = {
  async users() {
    const repository = getRepository(User)

    return await repository.find()
  }
}
