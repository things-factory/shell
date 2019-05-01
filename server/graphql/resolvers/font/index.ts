import { fontResolver } from './font'
import { fontsResolver } from './fonts'

import { updateFont } from './update-font'
import { createFont } from './create-font'
import { deleteFont } from './delete-font'

export const Query = {
  ...fontsResolver,
  ...fontResolver
}

export const Mutation = {
  ...updateFont,
  ...createFont,
  ...deleteFont
}
