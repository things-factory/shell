import { getRepository } from 'typeorm'
import { Publisher } from '../../../entities'

export const updatePublisher = {
  async updatePublisher(_, { id, patch }) {
    const repository = getRepository(Publisher)

    const publisher = await repository.findOne(
      { id }
    )

    return await repository.save({
      ...publisher,
      ...patch
    })
  }
}
