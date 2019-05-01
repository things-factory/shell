import { File } from './file'

export const Mutation = `
  singleUpload(
    file: Upload!
  ): File

  multipleUpload(
    files: [Upload]!
  ): [File]


  deleteFile (
    id: String!
  ): File
`

export const Query = `
  file: File
  files: [File]
`

export const Types = [File]
