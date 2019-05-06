import { Terminology } from './terminology'
import { NewTerminology } from './new-terminology'
import { TerminologyPatch } from './terminology-patch'

export const Mutation = `
  createTerminology (
    terminology: NewTerminology!
  ): Terminology

  updateTerminology (
    name: String!
    patch: TerminologyPatch!
  ): Terminology

  deleteTerminology (
    name: String!
  ): Terminology
`

export const Query = `
  terminologies: [Terminology]
  terminology(name: String!): Terminology
`

export const Types = [Terminology, NewTerminology, TerminologyPatch]
