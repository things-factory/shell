import { CommonCodeDetail } from './common-code-detail'
import { NewCommonCodeDetail } from './new-common-code-detail'
import { CommonCodeDetailPatch } from './common-code-detail-patch'

export const Mutation = `
  createCommonCodeDetail (
    commonCodeDetail: NewCommonCodeDetail!
    groupId: String!
  ): CommonCodeDetail

  updateCommonCodeDetail (
    id: String!
    patch: CommonCodeDetailPatch!
  ): CommonCodeDetail

  deleteCommonCodeDetail (
    id: String!
  ): CommonCodeDetail

  publishCommonCodeDetail (
    id: String!
    published: Boolean
  ): CommonCodeDetail
`

export const Query = `
  commonCodeDetails: [CommonCodeDetail]
  commonCodeDetail(id: String!): CommonCodeDetail
`

export const Types = [CommonCodeDetail, NewCommonCodeDetail, CommonCodeDetailPatch]
