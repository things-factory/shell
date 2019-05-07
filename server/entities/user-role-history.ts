import { Entity, Column, Index } from 'typeorm'
import { DomainBaseEntity } from '.'

@Entity('user-role-histories')
@Index('ix_user_role_histories_0', (userRoleHistory: UserRoleHistory) => [userRoleHistory.domain, userRoleHistory.id], {
  unique: true
})
export class UserRoleHistory extends DomainBaseEntity {
  @Column('text', {
    nullable: true
  })
  userAccountId: string

  @Column('text', {
    nullable: true
  })
  roleId: string

  @Column('text', {
    nullable: true
  })
  status: string
}
