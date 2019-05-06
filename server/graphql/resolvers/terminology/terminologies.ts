import { getRepository } from 'typeorm'
import { Terminology } from '../../../entities'

export const terminologiesResolver = {
  async terminologies() {
    const repository = getRepository(Terminology)

    return await repository.find()
  }
}
