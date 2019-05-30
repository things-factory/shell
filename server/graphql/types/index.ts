import * as DataSource from './datasource'
import * as Domain from './domain'
import * as File from './file'
import * as Publisher from './publisher'
export { Filter } from './filter'
export { ListParam } from './list-param'
export { Pagination } from './pagination'
export { Sorting } from './sorting'

export const queries = [Domain.Query, File.Query, DataSource.Query, Publisher.Query]

export const mutations = [Domain.Mutation, File.Mutation, DataSource.Mutation, Publisher.Mutation]

export const types = [...Domain.Types, ...File.Types, ...DataSource.Types, ...Publisher.Types]
