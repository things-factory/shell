import { getRepository } from 'typeorm'
import { DataSource } from '../../../entities'

export const updateDataSource = {
  async updateDataSource(_, { id, patch }) {
    const repository = getRepository(DataSource)

    const datasource = await repository.findOne(
      { id },
      {
        relations: ['publishers']
      }
    )

    return await repository.save({
      ...datasource,
      ...patch
    })
  }
}
