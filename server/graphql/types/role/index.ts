import { Role } from './role'
import { NewRole } from './new-role'
import { RolePatch } from './role-patch'

export const Mutation = `
  createRole (
    role: NewRole!
  ): Role

  updateRole (
    name: String!
    patch: RolePatch!
  ): Role

  deleteRole (
    name: String!
  ): Role
`

export const Query = `
  roles: [Role]
  role(name: String!): Role
`

export const Types = [Role, NewRole, RolePatch]
