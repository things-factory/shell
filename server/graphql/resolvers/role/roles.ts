import { getRepository } from 'typeorm'
import { Role } from '../../../entities'

export const rolesResolver = {
  async roles() {
    const repository = getRepository(Role)

    return await repository.find()
  }
}
