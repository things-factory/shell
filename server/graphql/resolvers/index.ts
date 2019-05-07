import * as User from './user'
import * as UserHistory from './user-history'

import * as File from './file'
import * as Setting from './setting'
import * as Font from './font'
import * as DataSource from './datasource'
import * as Publisher from './publisher'

import * as Board from './board'
import * as Group from './group'
import * as PlayGroup from './play-group'

import * as Menu from './menu'
import * as MenuButton from './menu-button'
import * as MenuColumn from './menu-column'
import * as Domain from './domain'
import * as CommonCode from './common-code'
import * as CommonCodeDetail from './common-code-detail'
import * as Resource from './resource'
import * as ResourceColumn from './resource-column'
import * as Terminology from './terminology'
import * as PermitUrl from './permit-url'

import { GraphQLUpload } from 'graphql-upload'

export const resolvers = {
  Query: {
    ...User.Query,
    ...UserHistory.Query,

    ...File.Query,
    ...Setting.Query,
    ...Font.Query,
    ...DataSource.Query,
    ...Publisher.Query,

    ...Board.Query,
    ...Group.Query,
    ...PlayGroup.Query,

    ...Menu.Query,
    ...MenuButton.Query,
    ...MenuColumn.Query,
    ...Domain.Query,
    ...CommonCode.Query,
    ...CommonCodeDetail.Query,
    ...Resource.Query,
    ...ResourceColumn.Query,
    ...Terminology.Query,
    ...PermitUrl.Query
  },

  Mutation: {
    ...User.Mutation,
    ...UserHistory.Mutation,

    ...File.Mutation,
    ...Setting.Mutation,
    ...Font.Mutation,
    ...DataSource.Mutation,
    ...Publisher.Mutation,

    ...Board.Mutation,
    ...Group.Mutation,
    ...PlayGroup.Mutation,

    ...Menu.Mutation,
    ...MenuButton.Mutation,
    ...MenuColumn.Mutation,
    ...Domain.Mutation,
    ...CommonCode.Mutation,
    ...CommonCodeDetail.Mutation,
    ...Resource.Mutation,
    ...ResourceColumn.Mutation,
    ...Terminology.Mutation,
    ...PermitUrl.Mutation
  },

  Upload: GraphQLUpload
}
