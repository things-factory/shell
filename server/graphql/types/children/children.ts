import gql from 'graphql-tag'

export const Children = gql`
  type Children {
    id: String
    name: String
    description: String
  }
`
