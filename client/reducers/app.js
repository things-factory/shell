import { UPDATE_MODULES, UPDATE_BASE_URL, UPDATE_CONTEXT_PATH, SET_DOMAINS } from '../actions/app.js'
import { getPathInfo } from '@things-factory/utils'

const INITIAL_STATE = {
  baseUrl: location.origin,
  contextPath: getPathInfo(location.pathname).contextPath,
  domains: []
}

const app = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_MODULES:
      return {
        ...state,
        modules: action.modules
      }
    case UPDATE_BASE_URL:
      return {
        ...state,
        baseUrl: action.baseUrl
      }
    case UPDATE_CONTEXT_PATH:
      return {
        ...state,
        contextPath: action.contextPath
      }

    case SET_DOMAINS:
      return {
        ...state,
        domains: action.domains
      }

    default:
      return state
  }
}

export default app
