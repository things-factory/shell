import { childrenResolver } from './children'

export const Query = {
  Parent: {
    ...childrenResolver
  }
}

export const Mutation = {}
