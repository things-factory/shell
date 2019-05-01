import { Font } from './font'
import { NewFont } from './new-font'
import { FontPatch } from './font-patch'

export const Mutation = `
  createFont (
    font: NewFont!
  ): Font

  updateFont (
    name: String!
    patch: FontPatch!
  ): Font

  deleteFont (
    name: String!
  ): Font
`

export const Query = `
  fonts: [Font]
  font(name: String!): Font
`

export const Types = [Font, NewFont, FontPatch]
