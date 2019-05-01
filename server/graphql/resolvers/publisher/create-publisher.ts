import uuid from 'uuid/v4'

import { getRepository } from 'typeorm'
import { DataSource, Publisher } from '../../../entities'

export const createPublisher = {
  async createPublisher(_, { publisher: attrs, datasourceId }) {
    const repository = getRepository(Publisher)
    const newPublisher = {
      id: uuid(),
      ...attrs
    }

    const datasourceRepository = getRepository(DataSource)
    newPublisher.datasource = await datasourceRepository.findOne({
      id: datasourceId
    })

    return await repository.save(newPublisher)
  }
}
