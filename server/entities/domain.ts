import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('domains')
@Index('ix_domain_0', (domain: Domain) => [domain.name], { unique: true })
@Index('ix_domain_1', (domain: Domain) => [domain.subdomain])
@Index('ix_domain_2', (domain: Domain) => [domain.systemFlag])
export class Domain {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    unique: true
  })
  name: string

  @Column({
    nullable: true
  })
  description: string

  @Column({
    nullable: true
  })
  timezone: string

  @Column({
    default: false
  })
  systemFlag: boolean

  @Column({
    nullable: true
  })
  subdomain: string

  @Column({
    nullable: true
  })
  brandName: string

  @Column({
    nullable: true
  })
  brandImage: string

  @Column({
    nullable: true
  })
  contentImage: string

  @Column({
    nullable: true
  })
  theme: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
