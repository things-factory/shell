import { Column, Entity, OneToMany } from 'typeorm'
import { Board } from './board'
import { DomainBasedStamp } from './stamps/domain-based-stamp'

@Entity('groups')
export class Group extends DomainBasedStamp {
  @Column('text', {
    unique: true,
    nullable: false
  })
  name: string

  @Column('text', {
    nullable: true
  })
  description: string

  @OneToMany(type => Board, board => board.group)
  boards: Board[]
}
