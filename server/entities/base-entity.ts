import { Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdAt: Date

  @CreateDateColumn()
  updatedAt: Date

  @Column('text', {
    nullable: true
  })
  creatorId: string

  @Column('text', {
    nullable: true
  })
  updaterId: string
}
