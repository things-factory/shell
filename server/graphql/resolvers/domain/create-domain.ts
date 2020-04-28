import { getRepository } from 'typeorm'
import { Domain } from '../../../entities'
import { NewDomain } from '../../types/domain/new-domain'

type CreateDomainInput = {
  domain: NewDomain
}

export const createDomain = {
  async createDomain(_: any, { domain }: CreateDomainInput): Promise<Domain> {
    return await getRepository(Domain).save(domain)
  }
}
