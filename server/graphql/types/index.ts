import * as Domain from './domain'
import * as System from './system'
export { Filter } from './filter'
export { ListParam } from './list-param'
export { ObjectRef } from './object-ref'
export { Pagination } from './pagination'
export { Sorting } from './sorting'

export const queries = [Domain.Query]

export const mutations = [Domain.Mutation]

export const subscriptions = [System.Subscription]

export const types = [...Domain.Types, ...System.Types]
