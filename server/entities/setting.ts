import { Column, Entity, Index } from 'typeorm'
import { DomainBaseEntity } from './domain-base-entity'

@Entity('settings')
@Index('ix_setting_0', (setting: Setting) => [setting.domain, setting.name], { unique: true })
@Index('ix_setting_1', (setting: Setting) => [setting.domain, setting.category])
export class Setting extends DomainBaseEntity {
  @Column('text')
  name: string

  @Column('text')
  category: string

  @Column('text', {
    nullable: true
  })
  value: string
}
