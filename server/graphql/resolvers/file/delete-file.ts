import { getRepository } from 'typeorm'
import { File } from '../../../entities'

import * as fs from 'fs'
import * as path from 'path'

export const deleteFile = {
  async deleteFile(_, { id }) {
    const repository = getRepository(File)

    const file = await repository.findOne(id)
    await repository.delete(id)

    const uploadDir = process.env.UPLOAD_DIR
    const fullpath = path.resolve(uploadDir, file.path)

    await fs.unlink(fullpath, e => {
      console.error(e)
    })
  }
}
