import gql from 'graphql-tag'

export const System = gql`
  type System {
    name: String
    description: String
    version: String
  }
`
