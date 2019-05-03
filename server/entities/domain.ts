import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column } from 'typeorm'

@Entity('domains')
export class Domain {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdAt: Date

  @CreateDateColumn()
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
  timezone: string

  @Column('boolean', {
    default: false
  })
  systemFlag: boolean

  @Column('text')
  subdomain: string

  @Column('text', {
    nullable: true
  })
  brandName: string

  @Column('text', {
    nullable: true
  })
  brandImage: string

  @Column('text', {
    nullable: true
  })
  contentImage: string

  @Column('text', {
    nullable: true
  })
  theme: string
}
