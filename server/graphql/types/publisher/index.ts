import { Publisher } from './publisher'
import { NewPublisher } from './new-publisher'
import { PublisherPatch } from './publisher-patch'

export const Mutation = `
  createPublisher (
    publisher: NewPublisher!
    groupId: String!
  ): Publisher

  updatePublisher (
    id: String!
    patch: PublisherPatch!
  ): Publisher

  deletePublisher (
    id: String!
  ): Publisher

  startPublisher (
    id: String!
    published: Boolean
  ): Publisher
`

export const Query = `
  publishers: [Publisher]
  publisher(id: String!): Publisher
`

export const Types = [Publisher, NewPublisher, PublisherPatch]
