import { getRepository } from 'typeorm'
import { Board } from '../entities'

export const headless = async ({ id = '', model = null } = {}) => {
  if (model) {
    if (typeof model == 'string') {
      model = JSON.parse(model)
    } else if (typeof model !== 'object') {
      throw 'model should be a string or object'
    }
  } else if (id) {
    const repository = getRepository(Board)
    const board = await repository.findOne({ id })
    model = JSON.parse(board.model)
  } else {
    throw 'parameter model or id mandatory'
  }

  return model
}
