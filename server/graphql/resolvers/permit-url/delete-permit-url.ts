import { getRepository } from 'typeorm'
import { PermitUrl } from '../../../entities/permit-url'

export const deletePermitUrl = {
  async deletePermitUrl(_, { id }) {
    const repository = getRepository(PermitUrl)

    return await repository.delete(id)
  }
}
