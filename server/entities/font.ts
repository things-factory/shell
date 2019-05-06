import { Column, Entity, Index } from 'typeorm'
import { DomainBaseEntity } from './domain-base-entity'

@Entity('fonts')
@Index('ix_font_0', (font: Font) => [font.domain, font.name], { unique: true })
export class Font extends DomainBaseEntity {
  @Column('text')
  name: string

  @Column('text')
  provider: string // custom, typekit, google,

  @Column('text', {
    nullable: true
  })
  uri: string // For typekit, custom,

  @Column('text', {
    nullable: true
  })
  path: string // Uploaded path for custom

  @Column('boolean')
  active: boolean
}
