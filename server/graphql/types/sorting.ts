import gql from 'graphql-tag'

export type Sorting = {
  name: string
  desc?: boolean
}

export const Sorting = gql`
  input Sorting {
    name: String
    desc: Boolean
  }
`
