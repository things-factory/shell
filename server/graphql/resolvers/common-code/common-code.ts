import { getRepository } from 'typeorm'
import { CommonCode } from '../../../entities'

export const commonCodeResolver = {
  async commonCode(_, { id }, context, info) {
    const repository = getRepository(CommonCode)

    return await repository.findOne(
      { id },
      {
        relations: ['commonCodeDetails']
      }
    )
  }
}
