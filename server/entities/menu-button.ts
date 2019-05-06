import { Entity, Column, ManyToOne } from 'typeorm'
import { Menu } from './menu'
import { DomainBaseEntity } from './domain-base-entity'

@Entity('menu-buttons')
export class MenuButton extends DomainBaseEntity {
  @Column('text')
  menuId: string

  @ManyToOne(Type => Menu, menu => menu.buttons)
  menu: Menu

  @Column('int')
  rank: number

  @Column('text', {
    nullable: true
  })
  style: string

  @Column('text', {
    nullable: true
  })
  icon: string

  @Column('text')
  text: string

  @Column('text', {
    nullable: true
  })
  auth: string

  @Column('text', {
    nullable: true
  })
  logic: string
}
