import gql from 'graphql-tag'

export const Domain = gql`
  type Domain {
    id: String
    name: String
    description: String
    timezone: String
    systemFlag: Boolean
    subdomain: String
    brandName: String
    brandImage: String
    contentImage: String
    theme: String
    createdAt: String
    updatedAt: String
  }
`
