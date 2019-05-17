import { getRepository } from 'typeorm'
import { Font } from '../../../entities'

export const fontResolver = {
  async font(_, { name }, context, info) {
    const repository = getRepository(Font)
    const domain = context.domain

    const params: any = { name }
    if (domain) {
      params.domain = domain
    }

    return await repository.findOne(params)
  }
}
