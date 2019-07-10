import { getRepository } from 'typeorm'
import { Domain } from '../../../entities/domain'

export const updateDomain = {
  async updateDomain(_: any, { name, patch }) {
    const repository = getRepository(Domain)
    const domain = await repository.findOne({ name })

    return await repository.save({
      ...domain,
      ...patch
    })
  }
}
