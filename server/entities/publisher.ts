import { Column, Entity, ManyToOne } from 'typeorm'
import { DataSource } from './datasource'
import { DomainBasedStamp } from './stamps/domain-based-stamp'

@Entity('publishers')
export class Publisher extends DomainBasedStamp {
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
  rule: string

  @Column('text', {
    nullable: true
  })
  type: string

  @Column('boolean', {
    default: false
  })
  started: boolean

  @ManyToOne(type => DataSource, datasource => datasource.publishers)
  datasource: DataSource
}
