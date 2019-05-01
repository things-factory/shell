import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('settings')
export class Setting {
  @PrimaryColumn()
  name: string

  @Column('text', {
    nullable: true
  })
  value: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
