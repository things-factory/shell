import { CommonCode } from './common-code'
import { NewCommonCode } from './new-common-code'
import { CommonCodePatch } from './common-code-patch'

export const Mutation = `
  createCommonCode (
    commonCode: NewCommonCode!
  ): CommonCode

  updateCommonCode (
    id: String!
    patch: CommonCodePatch!
  ): CommonCode

  deleteCommonCode (
    id: String!
  ): CommonCode

  publishCommonCode (
    id: String!
  ): CommonCode
`

export const Query = `
  commonCodes: [CommonCode]
  commonCode(id: String!): CommonCode
`

export const Types = [CommonCode, NewCommonCode, CommonCodePatch]
