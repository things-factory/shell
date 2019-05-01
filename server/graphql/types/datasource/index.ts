import { DataSource } from './datasource'
import { NewDataSource } from './new-datasource'
import { DataSourcePatch } from './datasource-patch'

export const Mutation = `
  createDataSource (
    datasource: NewDataSource!
  ): DataSource

  updateDataSource (
    id: String!
    patch: DataSourcePatch!
  ): DataSource

  deleteDataSource (
    id: String!
  ): DataSource
  `

export const Query = `
  datasources: [DataSource]
  datasource(id: String!): DataSource
`

export const Types = [DataSource, NewDataSource, DataSourcePatch]
