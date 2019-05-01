import { getRepository } from 'typeorm'
import { PlayGroup } from '../../../entities'

export const deletePlayGroup = {
  async deletePlayGroup(_, { id }) {
    const repository = getRepository(PlayGroup)

    /* TODO - 플레이 그룹은 소속된 보드-플레이그룹 관계들도 제거되어야 한다. */
    const playGroup = await repository.findOne({ id })

    return await repository.delete(id)
  }
}
