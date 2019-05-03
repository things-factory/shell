import { getRepository } from 'typeorm'
import { CommonCode, CommonCodeDetail } from '../../../entities'
import { thumbnail } from '../../../controllers/thumbnail'

export const updateCommonCode = {
  async updateCommonCode(_, { id, patch }) {
    const repository = getRepository(CommonCode)

    const commonCode = await repository.findOne({ id })

    return await repository.save({
      ...commonCode,
      ...patch
    })
  }
}
