import * as File from './file'
import * as DataSource from './datasource'
import * as Publisher from './publisher'
export { Filter } from './filter'
export { Pagination } from './pagination'

import * as Domain from './domain'

export const queries = [Domain.Query, File.Query, DataSource.Query, Publisher.Query]

export const mutations = [Domain.Mutation, File.Mutation, DataSource.Mutation, Publisher.Mutation]

export const types = [...Domain.Types, ...File.Types, ...DataSource.Types, ...Publisher.Types]
