import gql from 'graphql-tag'

export const Sorting = gql`
  input Sorting {
    name: String
    desc: Boolean
  }
`
