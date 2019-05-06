import { getRepository } from 'typeorm'
import { MenuColumn } from '../../../entities'

export const menuColumnsResolver = {
  async menuColumns() {
    const repository = getRepository(MenuColumn)

    return await repository.find()
  }
}
