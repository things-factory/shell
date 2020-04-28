import { DeleteResult, getRepository } from 'typeorm'
import { Domain } from '../../../entities/domain'

export const deleteDomain = {
  async deleteDomain(_: any, { name }: Record<string, string>): Promise<DeleteResult> {
    return await getRepository(Domain).delete({ name })
  }
}
