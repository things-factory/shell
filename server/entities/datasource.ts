import { Column, Entity, Index, OneToMany } from 'typeorm'
import { Publisher } from './publisher'
import { DomainBaseEntity } from './domain-base-entity'

@Entity('datasources')
@Index('ix_data_source_0', (dataSource: DataSource) => [dataSource.domain, dataSource.name], { unique: true })
export class DataSource extends DomainBaseEntity {
  @Column('text', {
    unique: true,
    nullable: false
  })
  name: string

  @Column('text', {
    nullable: true
  })
  description: string

  @Column('text', {
    nullable: true
  })
  credential: string

  @OneToMany(type => Publisher, publisher => publisher.datasource)
  publishers: Publisher[]
}
