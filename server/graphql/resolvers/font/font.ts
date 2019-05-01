import { getRepository } from 'typeorm'
import { Font } from '../../../entities'

export const fontResolver = {
  async font(_, { name }, context, info) {
    const repository = getRepository(Font)

    return await repository.findOne({ name })
  }
}
