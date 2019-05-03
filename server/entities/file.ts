import { Column, Entity } from 'typeorm'
import { DomainBasedStamp } from './stamps/domain-based-stamp'

@Entity('files')
export class File extends DomainBasedStamp {
  @Column('text')
  filename: string

  @Column('text')
  mimetype: string

  @Column('text')
  encoding: string

  @Column('text')
  path: string
}
