import { getRepository } from 'typeorm'
import { PermitUrl } from '../../../entities'

export const permitUrlsResolver = {
  async permitUrls() {
    const repository = getRepository(PermitUrl)

    return await repository.find()
  }
}
