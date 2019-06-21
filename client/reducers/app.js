import { UPDATE_BASE_URL, UPDATE_CONTEXT_PATH } from '../actions/app.js'

import { modules } from '../module-importer.import'

const INITIAL_STATE = {
  baseUrl: location.origin,
  contextPath: '',
  modules: modules
}

const app = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
