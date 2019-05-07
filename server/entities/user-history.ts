import { Column, Entity, Index } from 'typeorm'
import { DomainBaseEntity } from './domain-base-entity'

@Entity('user-histories')
@Index('ix_user_histories_0', (userHistory: UserHistory) => [userHistory.domain, userHistory.id], { unique: true })
export class UserHistory extends DomainBaseEntity {
  @Column('text', {
    nullable: true
  })
  userAccountId: string

  @Column('text', {
    nullable: true
  })
  status: string
}
