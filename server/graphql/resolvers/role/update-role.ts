import { getRepository } from 'typeorm'
import { Role } from '../../../entities'

export const updateRole = {
  async updateRole(_, { name, patch }) {
    const repository = getRepository(Role)

    const role = await repository.findOne({ name })

    return await repository.save({
      ...role,
      ...patch
    })
  }
}
