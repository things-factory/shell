import { menuResolver } from './menu'
import { menusResolver } from './menus'

import { updateMenu } from './update-menu'
import { createMenu } from './create-menu'
import { deleteMenu } from './delete-menu'

export const Query = {
  ...menusResolver,
  ...menuResolver
}

export const Mutation = {
  ...updateMenu,
  ...createMenu,
  ...deleteMenu
}
