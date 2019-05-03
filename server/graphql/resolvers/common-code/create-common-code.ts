import uuid from 'uuid/v4'

import { getRepository } from 'typeorm'
import { CommonCode, CommonCodeDetail } from '../../../entities'

export const createCommonCode = {
  async createCommonCode(_, { commonCode: attrs }) {
    const repository = getRepository(CommonCode)
    const newCommonCode = {
      id: uuid(),
      ...attrs
    }

    return await repository.save(newCommonCode)
  }
}
