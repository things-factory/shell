import { getRepository } from 'typeorm'
import { Font } from '../../../entities'

export const fontsResolver = {
  async fonts() {
    const repository = getRepository(Font)

    return await repository.find()
  }
}
