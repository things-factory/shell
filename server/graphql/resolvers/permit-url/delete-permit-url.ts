import { getRepository } from 'typeorm'
import { PermitUrl } from '../../../entities'

export const deletePermitUrl = {
  async deletePermitUrl(_, { name, patch }) {
    const repository = getRepository(PermitUrl)

    return await repository.delete(name)
  }
}
