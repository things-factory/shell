import { getRepository } from 'typeorm'
import { Domain } from '../../../entities'

export const domainsResolver = {
  async domains() {
    const repository = getRepository(Domain)

    return await repository.find()
  }
}
