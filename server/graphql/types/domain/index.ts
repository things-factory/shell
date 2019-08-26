import { Domain } from './domain'
import { NewDomain } from './new-domain'
import { DomainPatch } from './domain-patch'
import { DomainList } from './domain-list'
import { Filter } from '../filter'
import { Pagination } from '../pagination'
import { Sorting } from '../sorting'

export const Mutation = /* GraphQL */ `
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

export const Query = /* GraphQL */ `
  domains(filters: [Filter], pagination: Pagination, sortings: [Sorting]): DomainList
  domain(name: String!): Domain
`

export const Types = [Filter, Pagination, Sorting, Domain, NewDomain, DomainPatch, DomainList]
