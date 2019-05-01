import uuid from 'uuid/v4'

import { getRepository } from 'typeorm'
import { DataSource } from '../../../entities'

export const createDataSource = {
  async createDataSource(_, { datasource: attrs }) {
    const repository = getRepository(DataSource)

    const datasource = {
      id: uuid(),
      ...attrs
    }

    return await repository.save(datasource)
  }
}
