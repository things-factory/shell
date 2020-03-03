import * as Children from './children'
import * as Domain from './domain'
import * as Parent from './parent'
import * as System from './system'

export { Filter } from './filter'
export { ListParam } from './list-param'
export { ObjectRef } from './object-ref'
export { Pagination } from './pagination'
export { Sorting } from './sorting'

export const queries = [Domain.Query, Parent.Query, Children.Query]

export const mutations = [Domain.Mutation]

export const subscriptions = [System.Subscription]

export const types = [...Domain.Types, ...System.Types, ...Parent.Types, ...Children.Types]
