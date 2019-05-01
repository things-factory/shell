import { getRepository } from 'typeorm'
import { User } from '../../../entities'

export const createUser = {
  async createUser(_, { user: attrs }) {
    const repository = getRepository(User)

    return await repository.save({
      ...attrs,
      password: User.encode(attrs.password)
    })
  }
}
