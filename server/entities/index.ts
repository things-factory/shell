import { BaseEntity } from './base-entity'
import { DomainBaseEntity } from './domain-base-entity'

import { User } from './user'

import { File } from './file'
import { Setting } from './setting'
import { Font } from './font'
import { DataSource } from './datasource'
import { Publisher } from './publisher'

import { Board } from './board'
import { Group } from './group'
import { PlayGroup } from './play-group'

import { Menu } from './menu'
import { MenuButton } from './menu-button'
import { MenuColumn } from './menu-column'
import { Domain } from './domain'
import { CommonCode } from './common-code'
import { CommonCodeDetail } from './common-code-detail'
import { Resource } from './resource'
import { ResourceColumn } from './resource-column'
import { Terminology } from './terminology'
import { PermitUrl } from './permit-url'

export const entities = [
  BaseEntity,
  DomainBaseEntity,

  User,
  File,
  Setting,
  Font,
  DataSource,
  Publisher,
  Group,
  Board,
  PlayGroup,
  Menu,
  MenuButton,
  MenuColumn,
  Domain,
  CommonCode,
  CommonCodeDetail,
  Resource,
  ResourceColumn,
  Terminology,
  PermitUrl
]

export {
  BaseEntity,
  DomainBaseEntity,
  User,
  File,
  Setting,
  Font,
  DataSource,
  Publisher,
  Group,
  Board,
  PlayGroup,
  Menu,
  MenuColumn,
  MenuButton,
  Domain,
  CommonCode,
  CommonCodeDetail,
  Resource,
  ResourceColumn,
  Terminology,
  PermitUrl
}
