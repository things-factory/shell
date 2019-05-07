import { getRepository } from 'typeorm'
import { PermitUrl } from '../../../entities'

export const createPermitUrl = {
  async createPermitUrl(_, { permitUrl: attrs }) {
    const repository = getRepository(PermitUrl)

    return await repository.save({ ...attrs })
  }
}
