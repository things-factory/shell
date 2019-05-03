import { Resource } from './resource'
import { NewResource } from './new-resource'
import { ResourcePatch } from './resource-patch'

export const Mutation = `
  createResource (
    resource: NewResource!
  ): Resource

  updateResource (
    name: String!
    patch: ResourcePatch!
  ): Resource

  deleteResource (
    name: String!
  ): Resource
`

export const Query = `
  resources: [Resource]
  resource(name: String!): Resource
`

export const Types = [Resource, NewResource, ResourcePatch]
