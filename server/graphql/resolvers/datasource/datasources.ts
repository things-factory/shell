import { getRepository } from 'typeorm'
import { DataSource } from '../../../entities'

export const datasourcesResolver = {
  async datasources() {
    const repository = getRepository(DataSource)

    return await repository.find()
  }
}
