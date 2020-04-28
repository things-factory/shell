import gql from 'graphql-tag'
import { Domain } from '../../../entities'

export type NewDomain = Omit<Domain, 'id' | 'subdomain'> & {
  subdomain: string
}

export const NewDomain = gql`
  input NewDomain {
    name: String!
    description: String
    timezone: String
    systemFlag: Boolean
    subdomain: String!
    brandName: String
    brandImage: String
    contentImage: String
    theme: String
  }
`
