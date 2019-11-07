import { UPDATE_MODULES, UPDATE_BASE_URL, UPDATE_CONTEXT_PATH } from '../actions/app.js'
import { getPathInfo } from '../utils/context-path'

const INITIAL_STATE = {
  baseUrl: location.origin,
  contextPath: getPathInfo(location.pathname).contextPath
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

    default:
      return state
  }
}

export default app
