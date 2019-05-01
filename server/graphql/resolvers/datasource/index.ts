import { datasourceResolver } from './datasource'
import { datasourcesResolver } from './datasources'

import { updateDataSource } from './update-datasource'
import { createDataSource } from './create-datasource'
import { deleteDataSource } from './delete-datasource'

export const Query = {
  ...datasourcesResolver,
  ...datasourceResolver
}

export const Mutation = {
  ...updateDataSource,
  ...createDataSource,
  ...deleteDataSource
}
