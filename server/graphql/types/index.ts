import * as User from './user'

import * as File from './file'
import * as Setting from './setting'
import * as Font from './font'
import * as DataSource from './datasource'
import * as Publisher from './publisher'

import * as Board from './board'
import * as Group from './group'
import * as PlayGroup from './play-group'

const Query = [
  'type Query {',
  User.Query,

  File.Query,
  Setting.Query,
  Font.Query,
  DataSource.Query,
  Publisher.Query,

  Board.Query,
  Group.Query,
  PlayGroup.Query,
  '}'
].join('\n')

const Mutation = [
  'type Mutation {',
  User.Mutation,

  File.Mutation,
  Setting.Mutation,
  Font.Mutation,
  DataSource.Mutation,
  Publisher.Mutation,

  Board.Mutation,
  Group.Mutation,
  PlayGroup.Mutation,
  '}'
].join('\n')

export const typeDefs = [
  `
    schema {
      query: Query
      mutation: Mutation
    }
  `,
  Query,
  Mutation,

  `scalar Upload`,

  ...User.Types,

  ...File.Types,
  ...Setting.Types,
  ...Font.Types,
  ...DataSource.Types,
  ...Publisher.Types,

  ...Board.Types,
  ...Group.Types,
  ...PlayGroup.Types
]
