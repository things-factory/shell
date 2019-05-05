import { Column, Entity, OneToMany } from 'typeorm'
import { Publisher } from './publisher'
import { DomainBaseEntity } from './domain-base-entity'

@Entity('datasources')
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
