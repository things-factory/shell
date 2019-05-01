import { getRepository } from 'typeorm'
import { Publisher, Group } from '../../../entities'

export const updatePublisher = {
  async updatePublisher(_, { id, patch }) {
    const repository = getRepository(Publisher)

    const publisher = await repository.findOne(
      { id },
      {
        relations: ['group']
      }
    )

    return await repository.save({
      ...publisher,
      ...patch
    })
  }
}
