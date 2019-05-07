import { getRepository } from 'typeorm'
import { PermitUrl } from '../../../entities'

export const permitUrlResolver = {
  async permitUrl(_, { name }, context, info) {
    const repository = getRepository(PermitUrl)

    return await repository.findOne({ name })
  }
}
