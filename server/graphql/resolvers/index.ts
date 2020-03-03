import * as Children from './children'
import * as Domain from './domain'
import * as Parent from './parent'
import * as System from './system'

export const queries = [Domain.Query, Parent.Query, Children.Query]

export const mutations = [Domain.Mutation]

export const subscriptions = [System.Subscription]
