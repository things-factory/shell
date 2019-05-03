import { Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

export abstract class DomainBasedStamp {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text')
  domainId: string

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
