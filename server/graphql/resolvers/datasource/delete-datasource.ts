import { getRepository } from 'typeorm'
import { DataSource } from '../../../entities'

export const deleteDataSource = {
  async deleteDataSource(_, { id }) {
    const repository = getRepository(DataSource)

    /* TODO - 관련된 publisher가 있는 경우에는 datasource를 삭제할 수 없다. */

    return await repository.delete(id)
  }
}
