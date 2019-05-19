import * as File from './file'
import * as DataSource from './datasource'
import * as Publisher from './publisher'

import * as Domain from './domain'

export const queries = [File.Query, DataSource.Query, Publisher.Query, Domain.Query]

export const mutations = [File.Mutation, DataSource.Mutation, Publisher.Mutation, Domain.Mutation]
