import { Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'
import { Domain } from './domain'

import { BaseEntity } from './base-entity'

export abstract class DomainBaseEntity extends BaseEntity {
  @ManyToOne(type => Domain)
  domain: Domain
}
