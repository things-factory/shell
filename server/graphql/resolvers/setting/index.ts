import { settingResolver } from './setting'
import { settingsResolver } from './settings'

import { updateSetting } from './update-setting'
import { createSetting } from './create-setting'
import { deleteSetting } from './delete-setting'

export const Query = {
  ...settingsResolver,
  ...settingResolver
}

export const Mutation = {
  ...updateSetting,
  ...createSetting,
  ...deleteSetting
}
