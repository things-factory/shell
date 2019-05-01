import { getRepository } from 'typeorm'
import { Group } from '../../../entities'

export const deleteGroup = {
  async deleteGroup(_, { id }) {
    const repository = getRepository(Group)

    /* TODO - 그룹에 소속된 보드가 있는 경우에는 그룹을 지워서는 안된다. */
    const group = await repository.findOne({ id })

    return await repository.delete(id)
  }
}
