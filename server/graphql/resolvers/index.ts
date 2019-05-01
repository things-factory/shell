import * as User from "./user";

import * as File from "./file";
import * as Setting from "./setting";

import { GraphQLUpload } from "graphql-upload";

export const resolvers = {
  Query: {
    ...User.Query,

    ...File.Query,
    ...Setting.Query
  },

  Mutation: {
    ...User.Mutation,

    ...File.Mutation,
    ...Setting.Mutation
  },

  Upload: GraphQLUpload
};
