import { PermitUrl } from './permit-url'
import { NewPermitUrl } from './new-permit-url'
import { PermitUrlPatch } from './permit-url-patch'

export const Mutation = `
  createPermitUrl (
    permit-url: NewPermitUrl!
  ): PermitUrl

  updatePermitUrl (
    name: String!
    patch: PermitUrlPatch!
  ): PermitUrl

  deletePermitUrl (
    name: String!
  ): PermitUrl
`

export const Query = `
  permit-urls: [PermitUrl]
  permit-url(name: String!): PermitUrl
`

export const Types = [PermitUrl, NewPermitUrl, PermitUrlPatch]
