import { getRepository } from 'typeorm'
import { Terminology } from '../../../entities'

export const createTerminology = {
  async createTerminology(_, { font: attrs }) {
    const repository = getRepository(Terminology)

    return await repository.save({ ...attrs })
  }
}
