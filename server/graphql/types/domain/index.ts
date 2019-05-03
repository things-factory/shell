import { Domain } from './domain'
import { NewDomain } from './new-domain'
import { DomainPatch } from './domain-patch'

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
  domains: [Domain]
  domain(name: String!): Domain
`

export const Types = [Domain, NewDomain, DomainPatch]
