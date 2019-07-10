import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('domains')
@Index('ix_domain_0', (domain: Domain) => [domain.name], { unique: true })
@Index('ix_domain_1', (domain: Domain) => [domain.subdomain])
@Index('ix_domain_2', (domain: Domain) => [domain.systemFlag])
export class Domain {
  @PrimaryGeneratedColumn('uuid')
  id: string

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

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
