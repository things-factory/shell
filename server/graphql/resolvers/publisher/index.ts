import { publisherResolver } from './publisher'
import { publishersResolver } from './publishers'

import { startPublisher } from './start-publisher'
import { updatePublisher } from './update-publisher'
import { createPublisher } from './create-publisher'
import { deletePublisher } from './delete-publisher'

export const Query = {
  ...publishersResolver,
  ...publisherResolver
}

export const Mutation = {
  ...startPublisher,
  ...updatePublisher,
  ...createPublisher,
  ...deletePublisher
}
