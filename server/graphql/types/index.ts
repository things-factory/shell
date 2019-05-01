import * as User from "./user";

import * as File from "./file";
import * as Setting from "./setting";

const Query = ["type Query {", User.Query, File.Query, Setting.Query, "}"].join(
  "\n"
);

const Mutation = [
  "type Mutation {",
  User.Mutation,

  File.Mutation,
  Setting.Mutation,
  "}"
].join("\n");

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
  ...Setting.Types
];
