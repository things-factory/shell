import { Column, Entity, Index } from 'typeorm'
import { DomainBaseEntity } from './domain-base-entity'

@Entity('files')
@Index('ix_file_0', (file: File) => [file.domain, file.filename, file.mimetype], { unique: true })
export class File extends DomainBaseEntity {
  @Column('text')
  filename: string

  @Column('text')
  mimetype: string

  @Column('text')
  encoding: string

  @Column('text')
  path: string
}
