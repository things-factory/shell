import { resourceResolver } from './resource'
import { resourcesResolver } from './resources'

import { updateResource } from './update-resource'
import { createResource } from './create-resource'
import { deleteResource } from './delete-resource'

export const Query = {
  ...resourcesResolver,
  ...resourceResolver
}

export const Mutation = {
  ...updateResource,
  ...createResource,
  ...deleteResource
}
