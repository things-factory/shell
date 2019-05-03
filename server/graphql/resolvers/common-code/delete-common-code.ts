import { getRepository } from 'typeorm'
import { CommonCode } from '../../../entities'

export const deleteCommonCode = {
  async deleteCommonCode(_, { id }) {
    const repository = getRepository(CommonCode)

    return await repository.delete(id)
  }
}
