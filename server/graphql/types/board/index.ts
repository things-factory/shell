import { Board } from './board'
import { NewBoard } from './new-board'
import { BoardPatch } from './board-patch'

export const Mutation = `
  createBoard (
    board: NewBoard!
    groupId: String!
  ): Board

  updateBoard (
    id: String!
    patch: BoardPatch!
  ): Board

  deleteBoard (
    id: String!
  ): Board

  publishBoard (
    id: String!
    published: Boolean
  ): Board
`

export const Query = `
  boards: [Board]
  board(id: String!): Board
`

export const Types = [Board, NewBoard, BoardPatch]
