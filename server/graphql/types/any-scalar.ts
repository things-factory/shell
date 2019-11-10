import { GraphQLScalarType, Kind } from 'graphql'

export const AnyScalarType = new GraphQLScalarType({
  name: 'AnyScalar',
  description: 'Any Scalar type (String, Boolean, Int, Float)',
  serialize(value) {
    // Implement your own behavior here by setting the 'result' variable
    return value
  },
  parseValue(value) {
    // Implement your own behavior here by setting the 'result' variable
    return value
  },
  parseLiteral(ast) {
    switch (ast.kind) {
      case Kind.INT:
        return parseInt(ast.value)
      case Kind.FLOAT:
        return parseFloat(ast.value)
      case Kind.BOOLEAN:
        return ast.value
      case Kind.STRING:
        return ast.value
    }
  }
})
