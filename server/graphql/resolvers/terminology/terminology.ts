import { getRepository } from 'typeorm'
import { Terminology } from '../../../entities'

export const terminologyResolver = {
  async terminology(_, { name }, context, info) {
    const repository = getRepository(Terminology)

    return await repository.findOne({ name })
  }
}
