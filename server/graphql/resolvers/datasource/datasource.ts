import { getRepository } from 'typeorm'
import { DataSource } from '../../../entities'

export const datasourceResolver = {
  async datasource(_, { id }, context, info) {
    const repository = getRepository(DataSource)

    return await repository.findOne(
      { id },
      {
        relations: ['publishers']
      }
    )
  }
}
