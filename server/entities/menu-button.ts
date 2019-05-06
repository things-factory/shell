import { Entity, Column, Index, ManyToOne } from 'typeorm'
import { Menu } from './menu'
import { DomainBaseEntity } from './domain-base-entity'

@Entity('menu-buttons')
@Index('ix_menu_button_0', (menuButton: MenuButton) => [menuButton.menu, menuButton.text], { unique: true })
@Index('ix_menu_button_1', (menuButton: MenuButton) => [menuButton.menuId])
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
