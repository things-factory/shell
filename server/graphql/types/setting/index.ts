import { Setting } from './setting'
import { NewSetting } from './new-setting'
import { SettingPatch } from './setting-patch'

export const Mutation = `
  createSetting (
    setting: NewSetting!
  ): Setting

  updateSetting (
    name: String!
    patch: SettingPatch!
  ): Setting

  deleteSetting (
    name: String!
  ): Setting
`

export const Query = `
  settings: [Setting]
  setting(name: String!): Setting
`

export const Types = [Setting, NewSetting, SettingPatch]
