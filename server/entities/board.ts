import { Column, Entity, ManyToOne } from 'typeorm'
import { Group } from './group'
import { DomainBaseEntity } from './domain-base-entity'

@Entity('boards')
export class Board extends DomainBaseEntity {
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
  model: string

  @Column('text', {
    default: 'ratio',
    nullable: true
  })
  fit: string

  @Column('int')
  width: number

  @Column('int')
  height: number

  @Column('text')
  thumbnail: string

  @Column('boolean', {
    default: false
  })
  published: boolean

  @ManyToOne(type => Group, group => group.boards)
  group: Group
}
