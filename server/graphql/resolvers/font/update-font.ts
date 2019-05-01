import { getRepository } from 'typeorm'
import { Font } from '../../../entities'

export const updateFont = {
  async updateFont(_, { name, patch }) {
    const repository = getRepository(Font)

    const font = await repository.findOne({ name })

    return await repository.save({
      ...font,
      ...patch
    })
  }
}
