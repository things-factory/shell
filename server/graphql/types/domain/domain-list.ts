import gql from 'graphql-tag'

export const DomainList = gql`
  type DomainList {
    items: [Domain]
    total: Int
  }
`
