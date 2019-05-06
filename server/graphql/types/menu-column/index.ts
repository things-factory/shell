import { MenuColumn } from './menu-column'
import { NewMenuColumn } from './new-menu-column'
import { MenuColumnPatch } from './menu-column-patch'

export const Mutation = `
  createMenuColumn (
    menuColumn: NewMenuColumn!
  ): MenuColumn

  updateMenuColumn (
    name: String!
    patch: MenuColumnPatch!
  ): MenuColumn

  deleteMenuColumn (
    name: String!
  ): MenuColumn
`

export const Query = `
  menuColumns: [MenuColumn]
  menuColumn(name: String!): MenuColumn
`

export const Types = [MenuColumn, NewMenuColumn, MenuColumnPatch]
