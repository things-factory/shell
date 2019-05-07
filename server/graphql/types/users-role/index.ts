import { UsersRole } from './users-role'
import { NewUsersRole } from './new-users-role'
import { UsersRolePatch } from './users-role-patch'

export const Mutation = `
  createUsersRole (
    usersRole: NewUsersRole!
  ): UsersRole

  updateUsersRole (
    name: String!
    patch: UsersRolePatch!
  ): UsersRole

  deleteUsersRole (
    name: String!
  ): UsersRole
`

export const Query = `
  usersRoles: [UsersRole]
  usersRole(name: String!): UsersRole
`

export const Types = [UsersRole, NewUsersRole, UsersRolePatch]
