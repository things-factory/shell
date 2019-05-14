import * as User from './user'
import * as UserHistory from './user-history'

import * as File from './file'
import * as Font from './font'
import * as DataSource from './datasource'
import * as Publisher from './publisher'

import * as Domain from './domain'
import * as PermitUrl from './permit-url'
import * as Role from './role'
import * as UsersRole from './users-role'
import * as UserRoleHistory from './user-role-history'

export const queries = [
  User.Query,
  UserHistory.Query,

  File.Query,
  Font.Query,
  DataSource.Query,
  Publisher.Query,

  Domain.Query,
  PermitUrl.Query,
  Role.Query,
  UsersRole.Query,
  UserRoleHistory.Query
]

export const mutations = [
  User.Mutation,
  UserHistory.Mutation,

  File.Mutation,
  Font.Mutation,
  DataSource.Mutation,
  Publisher.Mutation,

  Domain.Mutation,
  PermitUrl.Mutation,
  Role.Mutation,
  UsersRole.Mutation,
  UserRoleHistory.Mutation
]

export const types = [
  ...User.Types,
  ...UserHistory.Types,

  ...File.Types,
  ...Font.Types,
  ...DataSource.Types,
  ...Publisher.Types,

  ...Domain.Types,
  ...PermitUrl.Types,
  ...Role.Types,
  ...UsersRole.Types,
  ...UserRoleHistory.Types
]
