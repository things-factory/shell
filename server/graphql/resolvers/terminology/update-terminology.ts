import { getRepository } from 'typeorm'
import { Terminology } from '../../../entities'

export const updateTerminology = {
  async updateTerminology(_, { name, patch }) {
    const repository = getRepository(Terminology)

    const terminology = await repository.findOne({ name })

    return await repository.save({
      ...terminology,
      ...patch
    })
  }
}
