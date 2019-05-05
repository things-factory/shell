import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { Board } from './board'
import { DomainBaseEntity } from './domain-base-entity'

@Entity('play-groups')
export class PlayGroup extends DomainBaseEntity {
  @Column('text', {
    unique: true,
    nullable: false
  })
  name: string

  @Column('text', {
    nullable: true
  })
  description: string

  @ManyToMany(type => Board)
  @JoinTable()
  boards: Board[]
}
