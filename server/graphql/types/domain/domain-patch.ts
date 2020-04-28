import gql from 'graphql-tag'
import { Domain } from '../../../entities'

export type DomainPatch = Partial<Domain>

export const DomainPatch = gql`
  input DomainPatch {
    name: String
    description: String
    timezone: String
    systemFlag: Boolean
    subdomain: String
    brandName: String
    brandImage: String
    contentImage: String
    theme: String
  }
`
