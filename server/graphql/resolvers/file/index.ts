import { fileResolver } from './file'
import { filesResolver } from './files'
import { deleteFile } from './delete-file'

import { singleUpload, multipleUpload } from './upload'

export const Query = {
  ...fileResolver,
  ...filesResolver
}

export const Mutation = {
  singleUpload,
  multipleUpload,
  ...deleteFile
}
