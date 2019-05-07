import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm'
import { DomainBaseEntity } from './domain-base-entity'
import { ResourceColumn } from './resource-column'

@Entity('entities')
@Index('ix_entity_0', (resource: Resource) => [resource.domain, resource.name], { unique: true })
@Index('ix_entity_1', (resource: Resource) => [resource.domain])
@Index('ix_entity_2', (resource: Resource) => [resource.bundle])
@Index('ix_entity_3', (resource: Resource) => [resource.domain, resource.masterId])
export class Resource extends DomainBaseEntity {
  @Column('text')
  name: string

  @Column('text', {
    nullable: true
  })
  description: string

  @Column('text')
  bundle: string

  @Column('text')
  tableName: string

  @Column('text', {
    nullable: true
  })
  searchUrl: string

  @Column('text', {
    nullable: true
  })
  multiSaveUrl: string

  @Column('text', {
    nullable: true
  })
  idType: string

  @Column('text', {
    nullable: true
  })
  idField: string

  @Column('text', {
    nullable: true
  })
  titleField: string

  @Column('text', {
    nullable: true
  })
  masterId: string

  @ManyToOne(type => Resource, parent => parent.children)
  parent: Resource

  @OneToMany(type => Resource, child => child.parent)
  children: Resource[]

  @Column('text', {
    nullable: true
  })
  association: string

  @Column('text', {
    nullable: true
  })
  dataProp: string

  @Column('text', {
    nullable: true
  })
  refField: string

  @Column('text', {
    nullable: true
  })
  delStrategy: string

  @Column('int', {
    nullable: true
  })
  fixedColumns: number

  @Column('boolean', {
    default: true
  })
  active: boolean

  @Column('boolean', {
    nullable: true
  })
  extEntity: boolean

  @OneToMany(type => ResourceColumn, resourceColumn => resourceColumn.entity)
  columns: ResourceColumn
}
