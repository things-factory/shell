import { BaseEntity } from './base-entity'
import { DomainBaseEntity } from './domain-base-entity'

import { File } from './file'
import { DataSource } from './datasource'
import { Publisher } from './publisher'

import { Domain } from './domain'

export const entities = [BaseEntity, DomainBaseEntity, File, DataSource, Publisher, Domain]

export { BaseEntity, DomainBaseEntity, File, DataSource, Publisher, Domain }
