import { PermitUrl } from './permit-url'
import { NewPermitUrl } from './new-permit-url'
import { PermitUrlPatch } from './permit-url-patch'

export const Mutation = `
  createPermitUrl (
    permitUrl: NewPermitUrl!
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
  permitUrls: [PermitUrl]
  permitUrl(name: String!): PermitUrl
`

export const Types = [PermitUrl, NewPermitUrl, PermitUrlPatch]
