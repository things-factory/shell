import { getRepository } from 'typeorm'
import { User } from '../../../entities'

export const updateUser = {
  async updateUser(_, { email, patch }) {
    const repository = getRepository(User)

    const user = await repository.findOne({ email })

    if (patch.password) {
      patch.password = User.encode(patch.password)
    }

    return await repository.save({
      ...user,
      ...patch
    })
  }
}
