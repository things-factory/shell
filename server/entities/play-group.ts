import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { Board } from './board'
import { DomainBasedStamp } from './stamps/domain-based-stamp'

@Entity('play-groups')
export class PlayGroup extends DomainBasedStamp {
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
