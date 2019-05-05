import { Entity, Index, Column } from 'typeorm'
import { DomainBaseEntity } from './domain-base-entity'

@Entity('settings')
@Index('ix_setting_0', (setting: Setting) => [setting.category, setting.name], { unique: true })
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
