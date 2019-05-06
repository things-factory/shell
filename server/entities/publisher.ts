import { Column, Entity, Index, ManyToOne } from 'typeorm'
import { DataSource } from './datasource'
import { DomainBaseEntity } from './domain-base-entity'

@Entity('publishers')
@Index('ix_publisher_0', (publisher: Publisher) => [publisher.domain, publisher.name], { unique: true })
export class Publisher extends DomainBaseEntity {
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
