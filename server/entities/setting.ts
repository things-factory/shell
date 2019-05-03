import { Entity, Index, Column } from 'typeorm'
import { DomainBasedStamp } from './stamps/domain-based-stamp'

@Entity('settings')
@Index('ix_setting_0', (setting: Setting) => [setting.category, setting.name], { unique: true })
export class Setting extends DomainBasedStamp {
  @Column('text')
  name: string

  @Column('text')
  category: string

  @Column('text', {
    nullable: true
  })
  value: string
}
