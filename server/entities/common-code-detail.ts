import { Column, Entity, Index, ManyToOne } from 'typeorm'
import { CommonCode } from './common-code'
import { DomainBasedStamp } from './stamps/domain-based-stamp'

@Entity('common-code-details')
@Index(
  'ix_common_code_detail_0',
  (commonCodeDetail: CommonCodeDetail) => [commonCodeDetail.name, commonCodeDetail.parentId],
  { unique: true }
)
@Index(
  'ix_common_code_detail_1',
  (commonCodeDetail: CommonCodeDetail) => [commonCodeDetail.name, commonCodeDetail.parentId],
  { unique: true }
)
export class CommonCodeDetail extends DomainBasedStamp {
  @Column('text')
  name: string

  @Column('text')
  parentId: string

  @ManyToOne(type => CommonCode, commonCode => commonCode.commonCodeDetails)
  parent: CommonCode

  @Column('text')
  description: string

  @Column('int')
  rank: number
}
