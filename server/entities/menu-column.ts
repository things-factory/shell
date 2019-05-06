import { Column, Entity, Index, ManyToOne } from 'typeorm'
import { DomainBaseEntity } from '.'
import { Menu } from './menu'

@Entity('menu-columns')
@Index('ix_menu_column_0', (menuColumn: MenuColumn) => [menuColumn.menu, menuColumn.name], { unique: true })
@Index('ix_menu_column_1', (menuColumn: MenuColumn) => [menuColumn.menu, menuColumn.rank], { unique: true })
export class MenuColumn extends DomainBaseEntity {
  @Column('text')
  menuId: string

  @ManyToOne(type => Menu, menu => menu.columns)
  menu: Menu

  @Column('text')
  name: string

  @Column('text', {
    nullable: true
  })
  description: string

  @Column('text', {
    nullable: true
  })
  rank: number

  @Column('text', {
    nullable: true
  })
  term: string

  @Column('text')
  colType: string

  @Column('int', {
    nullable: true
  })
  colSize: number

  @Column('boolean', {
    default: true
  })
  nullable: boolean

  @Column('text', {
    nullable: true
  })
  refType: string

  @Column('text', {
    nullable: true
  })
  refName: string

  @Column('text', {
    nullable: true
  })
  refUrl: string

  @Column('text', {
    nullable: true
  })
  refParams: string

  @Column('text', {
    nullable: true
  })
  refRelated: string

  @Column('int', {
    nullable: true
  })
  searchRank: number

  @Column('int', {
    nullable: true
  })
  sortRank: number

  @Column('boolean', {
    nullable: true
  })
  reverseSort: boolean

  @Column('boolean', {
    nullable: true
  })
  virtualField: boolean

  @Column('boolean', {
    nullable: true
  })
  extField: boolean

  @Column('text', {
    nullable: true
  })
  searchName: string

  @Column('text', {
    nullable: true
  })
  searchEditor: string
  @Column('text', {
    nullable: true
  })
  searchOper: string

  @Column('text', {
    nullable: true
  })
  searchInitVal: string

  @Column('int', {
    nullable: true
  })
  gridRank: number
  @Column('text', {
    nullable: true
  })
  gridEditor: string

  @Column('text', {
    nullable: true
  })
  gridFormat: string

  @Column('text', {
    nullable: true
  })
  gridValidator: string

  @Column('int', {
    nullable: true
  })
  gridWidth: number

  @Column('text', {
    nullable: true
  })
  gridAlign: string

  @Column('int', {
    nullable: true
  })
  uniqRank: number

  @Column('text', {
    nullable: true
  })
  formEditor: string

  @Column('text', {
    nullable: true
  })
  formValidator: string

  @Column('text', {
    nullable: true
  })
  formFormat: string

  @Column('text', {
    nullable: true
  })
  defVal: string

  @Column('text', {
    nullable: true
  })
  rangeVal: string

  @Column('boolean', {
    default: false
  })
  ignoreOnSave: boolean
}
