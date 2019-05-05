import { Entity, Column } from 'typeorm'

import { BaseEntity } from './base-entity'

@Entity('domains')
export class Domain extends BaseEntity {
  @Column('text', {
    unique: true
  })
  name: string

  @Column('text', {
    nullable: true
  })
  description: string

  @Column('text', {
    nullable: true
  })
  timezone: string

  @Column('boolean', {
    default: false
  })
  systemFlag: boolean

  @Column('text')
  subdomain: string

  @Column('text', {
    nullable: true
  })
  brandName: string

  @Column('text', {
    nullable: true
  })
  brandImage: string

  @Column('text', {
    nullable: true
  })
  contentImage: string

  @Column('text', {
    nullable: true
  })
  theme: string
}
