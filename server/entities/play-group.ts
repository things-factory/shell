import { Column, Entity, Index, JoinTable, ManyToMany } from 'typeorm'
import { Board } from './board'
import { DomainBaseEntity } from './domain-base-entity'

@Entity('play-groups')
@Index('ix_play_group_0', (playGroup: PlayGroup) => [playGroup.domain, playGroup.name], { unique: true })
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
  @JoinTable({ name: 'play-groups-boards' })
  boards: Board[]
}
