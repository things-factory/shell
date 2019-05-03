import { getRepository } from 'typeorm'
import { CommonCode } from '../../../entities'

export const commonCodesResolver = {
  async commonCodes() {
    const repository = getRepository(CommonCode)

    return await repository.find()
  }
}
