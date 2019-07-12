import { getRepository } from 'typeorm'
import { Domain } from '../../../entities'

export const createDomain = {
  async createDomain(_: any, { domain }) {
    return await getRepository(Domain).save(domain)
  }
}
