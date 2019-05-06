import { menuButtonResolver } from './menu-button'
import { menuButtonsResolver } from './menu-buttons'

import { updateMenuButton } from './update-menu-button'
import { createMenuButton } from './create-menu-button'
import { deleteMenuButton } from './delete-menu-button'

export const Query = {
  ...menuButtonResolver,
  ...menuButtonsResolver
}

export const Mutation = {
  ...updateMenuButton,
  ...createMenuButton,
  ...deleteMenuButton
}
