import { Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

import { BaseEntity } from './base-entity'

export abstract class DomainBaseEntity extends BaseEntity {
  @Column('text')
  domainId: string
}
