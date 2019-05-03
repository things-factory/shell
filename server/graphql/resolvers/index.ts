import * as User from './user'

import * as File from './file'
import * as Setting from './setting'
import * as Font from './font'
import * as DataSource from './datasource'
import * as Publisher from './publisher'

import * as Board from './board'
import * as Group from './group'
import * as PlayGroup from './play-group'

import * as Menu from './menu'
import * as Domain from './domain'

import { GraphQLUpload } from 'graphql-upload'

export const resolvers = {
  Query: {
    ...User.Query,

    ...File.Query,
    ...Setting.Query,
    ...Font.Query,
    ...DataSource.Query,
    ...Publisher.Query,

    ...Board.Query,
    ...Group.Query,
    ...PlayGroup.Query,

    ...Menu.Query,
    ...Domain.Query
  },

  Mutation: {
    ...User.Mutation,

    ...File.Mutation,
    ...Setting.Mutation,
    ...Font.Mutation,
    ...DataSource.Mutation,
    ...Publisher.Mutation,

    ...Board.Mutation,
    ...Group.Mutation,
    ...PlayGroup.Mutation,

    ...Menu.Mutation,
    ...Domain.Mutation
  },

  Upload: GraphQLUpload
}
