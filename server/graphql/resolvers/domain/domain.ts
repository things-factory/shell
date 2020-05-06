import 'reflect-metadata'
import { getRepository } from 'typeorm'
import { Domain } from '../../../entities'

export const domainResolver = {
  async domain(_, { name }: Record<string, string>, context, info): Promise<Domain> {
    const repository = getRepository(Domain)

    return await repository.findOne({ name })
  }
}
