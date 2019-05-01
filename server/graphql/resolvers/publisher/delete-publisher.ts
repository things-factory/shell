import { getRepository } from 'typeorm'
import { Publisher } from '../../../entities'

export const deletePublisher = {
  async deletePublisher(_, { id }) {
    const repository = getRepository(Publisher)

    /* TODO - 퍼블리셔 삭제시 스케듈들이 모두 스톱되어야 한다. */

    return await repository.delete(id)
  }
}
