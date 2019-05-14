import { BaseEntity } from './base-entity'
import { DomainBaseEntity } from './domain-base-entity'

import { File } from './file'
import { Font } from './font'
import { DataSource } from './datasource'
import { Publisher } from './publisher'

import { Domain } from './domain'

export const entities = [BaseEntity, DomainBaseEntity, File, Font, DataSource, Publisher, Domain]

export { BaseEntity, DomainBaseEntity, File, Font, DataSource, Publisher, Domain }
