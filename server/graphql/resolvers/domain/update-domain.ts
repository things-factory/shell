import 'reflect-metadata'
import { getRepository } from 'typeorm'
import { Domain } from '../../../entities/domain'
import { DomainPatch } from '../../types/domain/domain-patch'

type UpdateDomainInput = {
  name: string
  patch: DomainPatch
}

export const updateDomain = {
  async updateDomain(_: any, { name, patch }: UpdateDomainInput) {
    const repository = getRepository(Domain)
    const domain = await repository.findOne({ name })

    return await repository.save({
      ...domain,
      ...patch
    })
  }
}
