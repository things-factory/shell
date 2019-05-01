import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('files')
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column('text')
  filename: string

  @Column('text')
  mimetype: string

  @Column('text')
  encoding: string

  @Column('text')
  path: string
}
