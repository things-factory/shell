import { Entity, Index, Column, OneToMany } from 'typeorm'
import { CommonCodeDetail } from './common-code-detail'
import { DomainBasedStamp } from './stamps/domain-based-stamp'

@Entity('common-codes')
@Index('ix_common_code_0', (commonCode: CommonCode) => [commonCode.name, commonCode.bundle], { unique: true })
@Index('ix_common_code_1', (commonCode: CommonCode) => [commonCode.domainId, commonCode.bundle], { unique: true })
export class CommonCode extends DomainBasedStamp {
  @Column('text')
  name: string

  @Column('text', {
    nullable: true
  })
  description: string

  @Column('text')
  bundle: string

  @OneToMany(type => CommonCodeDetail, commonCodeDetail => commonCodeDetail.parent)
  commonCodeDetails: CommonCodeDetail[]
}
