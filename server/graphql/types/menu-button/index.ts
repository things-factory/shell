import { MenuButton } from './menu-button'
import { NewMenuButton } from './new-menu-button'
import { MenuButtonPatch } from './menu-button-patch'

export const Mutation = `
  createMenuButton (
    menuButton: NewMenuButton!
  ): MenuButton

  updateMenuButton (
    name: String!
    patch: MenuButtonPatch!
  ): MenuButton

  deleteMenuButton (
    name: String!
  ): MenuButton
`

export const Query = `
  menuButtons: [MenuButton]
  menuButton(name: String!): MenuButton
`

export const Types = [MenuButton, NewMenuButton, MenuButtonPatch]
