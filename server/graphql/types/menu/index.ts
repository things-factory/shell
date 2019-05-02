import { Menu } from './menu'
import { NewMenu } from './new-menu'
import { MenuPatch } from './menu-patch'

export const Mutation = `
  createMenu (
    menu: NewMenu!
  ): Menu

  updateMenu (
    name: String!
    patch: MenuPatch!
  ): Menu

  deleteMenu (
    name: String!
  ): Menu
`

export const Query = `
  menus: [Menu]
  menu(name: String!): Menu
`

export const Types = [Menu, NewMenu, MenuPatch]
