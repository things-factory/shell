import { getRepository } from 'typeorm'
import { Terminology } from '../../../entities'

export const deleteTerminology = {
  async deleteTerminology(_, { name }) {
    const repository = getRepository(Terminology)

    return await repository.delete(name)
  }
}
