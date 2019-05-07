import { getRepository } from 'typeorm'
import { PermitUrl } from '../../../entities'

export const updatePermitUrl = {
  async updatePermitUrl(_, { name, patch }) {
    const repository = getRepository(PermitUrl)

    const permitUrl = await repository.findOne({ name })

    return await repository.save({
      ...permitUrl,
      ...patch
    })
  }
}
