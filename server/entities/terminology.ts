import { DomainBaseEntity } from './domain-base-entity'
import { Entity, Column, Index } from 'typeorm'

@Entity('terminologies')
@Index('ix_term_0', (term: Terminology) => [term.domain, term.locale, term.category, term.name], { unique: true })
@Index('ix_term_1', (term: Terminology) => [term.domain])
@Index('ix_term_2', (term: Terminology) => [term.domain, term.locale])
@Index('ix_term_3', (term: Terminology) => [term.domain, term.locale, term.name])
export class Terminology extends DomainBaseEntity {
  @Column('text')
  name: string

  @Column('text', {
    nullable: true
  })
  description: string

  @Column('text')
  locale: string

  @Column('text')
  category: string

  @Column('text', {
    nullable: true
  })
  display: string
}
