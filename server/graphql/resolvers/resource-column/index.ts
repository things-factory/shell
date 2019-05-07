import { resourceColumnResolver } from './resource-column'
import { resourceColumnsResolver } from './resource-columns'

import { updateResourceColumn } from './update-resource-column'
import { createResourceColumn } from './create-resource-column'
import { deleteResourceColumn } from './delete-resource-column'

export const Query = {
  ...resourceColumnResolver,
  ...resourceColumnsResolver
}

export const Mutation = {
  ...updateResourceColumn,
  ...createResourceColumn,
  ...deleteResourceColumn
}
