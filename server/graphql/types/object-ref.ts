import gql from 'graphql-tag'

export const ObjectRef = gql`
  input ObjectRef {
    id: String!
    name: String
    description: String
  }
`
