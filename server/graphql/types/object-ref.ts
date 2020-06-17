import gql from 'graphql-tag'

export type ObjectRef = {
  id: string
  name?: string
  description?: string
}

export const ObjectRef = gql`
  input ObjectRef {
    id: String!
    name: String
    description: String
  }
`
