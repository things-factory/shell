import { Column, Entity, Index, OneToMany } from 'typeorm'
import { Board } from './board'
import { DomainBaseEntity } from './domain-base-entity'

@Entity('groups')
@Index('ix_group_0', (group: Group) => [group.domain, group.name], { unique: true })
export class Group extends DomainBaseEntity {
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
