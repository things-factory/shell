import { Field, ID, ObjectType } from 'type-graphql'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@ObjectType('Domain')
@Entity('domains')
@Index('ix_domain_0', (domain: Domain) => [domain.name], { unique: true })
@Index('ix_domain_1', (domain: Domain) => [domain.subdomain])
@Index('ix_domain_2', (domain: Domain) => [domain.systemFlag])
export class Domain {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column({ unique: true })
  name: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  timezone?: string

  @Field({ defaultValue: false })
  @Column({ default: false })
  systemFlag: boolean

  @Field({ nullable: true })
  @Column({ nullable: true })
  subdomain?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  brandName?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  brandImage?: string

  @Column({ nullable: true })
  contentImage?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  theme?: string

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
