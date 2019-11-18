import * as Domain from './domain'

export { Filter } from './filter'
export { ListParam } from './list-param'
export { Pagination } from './pagination'
export { Sorting } from './sorting'
export { ObjectRef } from './object-ref'

export const queries = [Domain.Query]

export const mutations = [Domain.Mutation]

export const subscriptions = []

export const types = [...Domain.Types]
