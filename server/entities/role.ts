import { DomainBaseEntity } from './domain-base-entity'
import { Entity, Column, Index } from 'typeorm'

@Entity('roles')
@Index('ix_role_0', (role: Role) => [role.domain, role.name], { unique: true })
@Index('ix_role_1', (role: Role) => [role.domain, role.updatedAt])
export class Role extends DomainBaseEntity {
  @Column('text')
  name: string

  @Column('text', {
    nullable: true
  })
  description: string
}
