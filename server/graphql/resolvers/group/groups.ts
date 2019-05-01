import { getRepository } from 'typeorm'
import { Group } from '../../../entities'

export const groupsResolver = {
  async groups() {
    const repository = getRepository(Group)

    return await repository.find()
  }
}
