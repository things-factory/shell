import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

import { Group } from './group'
import { PlayGroup } from './play-group'

@Entity('boards')
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

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
