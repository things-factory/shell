import { getRepository } from 'typeorm'
import { Domain } from '../../../entities/domain'

export const deleteDomain = {
  async deleteDomain(_: any, { name }) {
    return await getRepository(Domain).delete({ name })
  }
}
