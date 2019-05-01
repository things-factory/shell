import { getRepository } from 'typeorm'
import { Publisher } from '../../../entities'

export const startPublisher = {
  async startPublisher(_, { id, started }) {
    const repository = getRepository(Publisher)

    const publisher = await repository.findOne(
      { id },
      {
        relations: ['datasource']
      }
    )

    publisher.started = !!started

    return await repository.save(publisher)
  }
}
