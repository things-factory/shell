import { menuColumnResolver } from './menu-column'
import { menuColumnsResolver } from './menu-columns'

import { updateMenuColumn } from './update-menu-column'
import { createMenuColumn } from './create-menu-column'
import { deleteMenuColumn } from './delete-menu-column'

export const Query = {
  ...menuColumnResolver,
  ...menuColumnsResolver
}

export const Mutation = {
  ...updateMenuColumn,
  ...createMenuColumn,
  ...deleteMenuColumn
}
