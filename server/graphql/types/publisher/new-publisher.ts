import { gql } from 'apollo-server-koa'

export const NewPublisher = gql`
  input NewPublisher {
    name: String
    description: String
    rule: String
    type: String
    started: Boolean
  }
`
