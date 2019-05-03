import { getRepository } from 'typeorm'
import { CommonCodeDetail } from '../../../entities'

export const commonCodeDetailsResolver = {
  async commonCodeDetails() {
    const repository = getRepository(CommonCodeDetail)

    return await repository.find({
      relations: ['parent']
    })
  }
}
