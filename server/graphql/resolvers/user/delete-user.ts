import { getRepository } from 'typeorm'
import { User } from '../../../entities'

export const deleteUser = {
  async deleteUser(_, { email }) {
    const repository = getRepository(User)

    return await repository.delete(email)
  }
}
