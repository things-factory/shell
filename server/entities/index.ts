import { BaseEntity } from './base-entity'
import { DomainBaseEntity } from './domain-base-entity'

import { User } from './user'
import { UserHistory } from './user-history'

import { File } from './file'
import { Font } from './font'
import { DataSource } from './datasource'
import { Publisher } from './publisher'

import { Domain } from './domain'
import { PermitUrl } from './permit-url'
import { Role } from './role'
import { UsersRole } from './users-role'
import { UserRoleHistory } from './user-role-history'

export const entities = [
  BaseEntity,
  DomainBaseEntity,

  User,
  UserHistory,
  File,
  Font,
  DataSource,
  Publisher,
  Domain,
  PermitUrl,
  Role,
  UsersRole,
  UserRoleHistory
]

export {
  BaseEntity,
  DomainBaseEntity,
  User,
  UserHistory,
  File,
  Font,
  DataSource,
  Publisher,
  Domain,
  PermitUrl,
  Role,
  UsersRole,
  UserRoleHistory
}
