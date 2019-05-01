import { User } from './user'
import { NewUser } from './new-user'
import { UserPatch } from './user-patch'

export const Mutation = `
  createUser (
    user: NewUser!
  ): User

  updateUser (
    email: String!
    patch: UserPatch!
  ): User

  deleteUser (
    email: String!
  ): User
`

export const Query = `
  users: [User]
  user(email: String!): User
`

export const Types = [User, NewUser, UserPatch]
