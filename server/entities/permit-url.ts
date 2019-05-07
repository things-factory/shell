import { DomainBaseEntity } from '.'
import { Entity, Column, Index } from 'typeorm'

@Entity('permit-urls')
@Index('ix_permit_url_0', (permitUrl: PermitUrl) => [permitUrl.domain, permitUrl.name], { unique: true })
export class PermitUrl extends DomainBaseEntity {
  @Column('text')
  name: string

  @Column('text', {
    nullable: true
  })
  description: string

  @Column('text')
  type: string

  @Column('boolean', {
    nullable: true,
    default: false
  })
  active: boolean
}
