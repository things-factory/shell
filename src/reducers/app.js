import { UPDATE_BASE_URL } from '../actions/app.js'

import { modules } from '../module-importer.import'

const INITIAL_STATE = {
  baseUrl: location.origin,
  contextPath: '',
  /* FIXME. 왜 modules의 순서가 뒤집어지는 지 이해할 수 없음. */
  modules: modules.reverse()
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
