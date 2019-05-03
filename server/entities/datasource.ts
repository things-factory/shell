import { Column, Entity, OneToMany } from 'typeorm'
import { Publisher } from './publisher'
import { DomainBasedStamp } from './stamps/domain-based-stamp'

@Entity('datasources')
export class DataSource extends DomainBasedStamp {
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
