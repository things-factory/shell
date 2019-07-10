import { Domain } from './domain'
import { NewDomain } from './new-domain'
import { DomainPatch } from './domain-patch'
import { DomainList } from './domain-list'
import { Filter, Pagination, Sorting } from '../'

export const Mutation = `
  createDomain (
    domain: NewDomain!
  ): Domain

  updateDomain (
    name: String!
    patch: DomainPatch!
  ): Domain

  deleteDomain (
    name: String!
  ): Domain
`

export const Query = `
  domains(filters: [Filter], pagination: Pagination, sortings: [Sorting]): DomainList
  domain(name: String!): Domain
`

export const Types = [Filter, Pagination, Sorting, Domain, NewDomain, DomainPatch, DomainList]
