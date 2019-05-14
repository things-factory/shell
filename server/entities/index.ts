import { BaseEntity } from './base-entity'
import { DomainBaseEntity } from './domain-base-entity'

import { User } from './user'
import { UserHistory } from './user-history'

import { File } from './file'
import { Font } from './font'
import { DataSource } from './datasource'
import { Publisher } from './publisher'

import { Domain } from './domain'
import { Resource } from './resource'
import { ResourceColumn } from './resource-column'
import { Terminology } from './terminology'
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
  Resource,
  ResourceColumn,
  Terminology,
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
  Resource,
  ResourceColumn,
  Terminology,
  PermitUrl,
  Role,
  UsersRole,
  UserRoleHistory
}
