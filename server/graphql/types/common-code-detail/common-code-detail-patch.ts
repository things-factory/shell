import { gql } from 'apollo-server-koa'

export const CommonCodeDetailPatch = gql`
  input CommonCodeDetailPatch {
    parentId: String
    rank: Int
    name: String
    description: String
  }
`
