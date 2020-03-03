import gql from 'graphql-tag'

export const Parent = gql`
  type Parent {
    id: String
    name: String
    description: String
    children(name: String): [Children]
  }
`
