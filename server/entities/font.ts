import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { DomainBaseEntity } from './domain-base-entity'
import { cpus } from 'os'

@Entity('fonts')
export class Font extends DomainBaseEntity {
  @Column('text')
  name: string

  @Column('text')
  provider: string // custom, typekit, google,

  @Column('text', {
    nullable: true
  })
  uri: string // For typekit, custom,

  @Column('text', {
    nullable: true
  })
  path: string // Uploaded path for custom

  @Column('boolean')
  active: boolean
}
