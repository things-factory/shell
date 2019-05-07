import { getRepository } from 'typeorm'
import { ResourceColumn } from '../../../entities'

export const resourceColumnsResolver = {
  async resourceColumns() {
    const repository = getRepository(ResourceColumn)

    return await repository.find()
  }
}
