import { getRepository } from 'typeorm'
import { CommonCodeDetail } from '../../../entities'

export const commonCodeDetailResolver = {
  async commonCodeDetail(_, { id }, context, info) {
    const repository = getRepository(CommonCodeDetail)

    return await repository.findOne(
      { id },
      {
        relations: ['parent']
      }
    )
  }
}
