import { getRepository } from 'typeorm'
import { File } from '../../../entities'

export const fileResolver = {
  async file(_, { id }, context, info) {
    const repository = getRepository(File)

    return await repository.findOne({ id })
  }
}
