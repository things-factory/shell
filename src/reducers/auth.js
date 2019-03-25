import { SET_AUTH, SET_PROFILE, SET_LOCALE } from '../actions/auth.js'

const INITIAL_STATE = {
  locale: 'en-US',
  authenticated: false,
  accessToken: '',
  user: null
}

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOCALE:
      return {
        ...state,
        locale: action.locale || 'en-US'
      }

    case SET_AUTH:
      let auth = action.auth

      return {
        ...state,
        authenticated: auth.authenticated,
        accessToken: auth.accessToken
      }

    case SET_PROFILE:
      return {
        ...state,
        user: action.user
      }

    default:
      return state
  }
}

export default auth
