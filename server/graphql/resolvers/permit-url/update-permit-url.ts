import { getRepository } from 'typeorm'
import { PermitUrl } from '../../../entities/permit-url'

export const updatePermitUrl = {
  async updatePermitUrl(_, { id, patch }) {
    const repository = getRepository(PermitUrl)

    const permitUrl = await repository.findOne({ id })

    return await repository.save({
      ...permitUrl,
      ...patch
    })
  }
}
