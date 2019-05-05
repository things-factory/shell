import { Column, Entity } from 'typeorm'
import { DomainBaseEntity } from './domain-base-entity'

@Entity('files')
export class File extends DomainBaseEntity {
  @Column('text')
  filename: string

  @Column('text')
  mimetype: string

  @Column('text')
  encoding: string

  @Column('text')
  path: string
}
