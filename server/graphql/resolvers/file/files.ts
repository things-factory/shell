import { getRepository } from 'typeorm'
import { File } from '../../../entities'

export const filesResolver = {
  async files() {
    const repository = getRepository(File)

    return await repository.find()
  }
}
