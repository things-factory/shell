import { BaseEntity } from './base-entity'
import { DomainBaseEntity } from './domain-base-entity'

import { User } from './user'
import { UserHistory } from './user-history'

import { File } from './file'
import { Font } from './font'
import { DataSource } from './datasource'
import { Publisher } from './publisher'

import { Board } from './board'
import { Group } from './group'
import { PlayGroup } from './play-group'

import { Domain } from './domain'
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
  Group,
  Board,
  PlayGroup,
  Domain,
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
  Group,
  Board,
  PlayGroup,
  Domain,
  Terminology,
  PermitUrl,
  Role,
  UsersRole,
  UserRoleHistory
}
