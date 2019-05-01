import { User } from '../entities'

export function getToken(context) {
  const req = context.request

  var token =
    context.cookies.get('access_token') ||
    req.headers['x-access-token'] ||
    req.headers['authorization'] ||
    req.query.token ||
    null

  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    return token.slice(7, token.length)
  }

  context.state.token = token

  return token
}

export async function authMiddleware(context, next) {
  try {
    var token = getToken(context)

    if (!token) {
      throw Error('not signed in')
    }

    context.state.user = await User.check(token)

    return next()
  } catch (e) {
    context.status = 401
    context.body = {
      success: false,
      message: e.message
    }
  }
}
