import { ResourceColumn } from './resource-column'
import { NewResourceColumn } from './new-resource-column'
import { ResourceColumnPatch } from './resource-column-patch'

export const Mutation = `
  createResourceColumn (
    resourceColumn: NewResourceColumn!
  ): ResourceColumn

  updateResourceColumn (
    name: String!
    patch: ResourceColumnPatch!
  ): ResourceColumn

  deleteResourceColumn (
    name: String!
  ): ResourceColumn
`

export const Query = `
  resourceColumns: [ResourceColumn]
  resourceColumn(name: String!): ResourceColumn
`

export const Types = [ResourceColumn, NewResourceColumn, ResourceColumnPatch]
