import { getRepository } from 'typeorm'
import { Publisher } from '../../../entities'

export const publishersResolver = {
  async publishers() {
    const repository = getRepository(Publisher)

    return await repository.find()
  }
}
