import * as User from './user'

import * as File from './file'
import * as Font from './font'
import * as DataSource from './datasource'
import * as Publisher from './publisher'

import * as Domain from './domain'

export const queries = [User.Query, File.Query, Font.Query, DataSource.Query, Publisher.Query, Domain.Query]

export const mutations = [
  User.Mutation,

  File.Mutation,
  Font.Mutation,
  DataSource.Mutation,
  Publisher.Mutation,

  Domain.Mutation
]
