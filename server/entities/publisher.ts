import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { DataSource } from './datasource'

@Entity('publishers')
export class Publisher {
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
  rule: string

  @Column('text', {
    nullable: true
  })
  type: string

  @Column('boolean', {
    default: false
  })
  started: boolean

  @ManyToOne(type => DataSource, datasource => datasource.publishers)
  datasource: DataSource
}
