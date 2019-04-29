import { UPDATE_PAGE, UPDATE_OFFLINE, UPDATE_BASE_URL } from '../actions/app.js'

import { modules } from '../module-importer.import'

const INITIAL_STATE = {
  page: '',
  resourceId: '',
  params: {},
  offline: false,
  baseUrl: location.origin,
  homePage: '',
  /* FIXME. 왜 modules의 순서가 뒤집어지는 지 이해할 수 없음. */
  modules: modules.reverse()
}

const app = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return {
        ...state,
        page: action.page,
        resourceId: action.resourceId,
        params: action.params
      }
    case UPDATE_OFFLINE:
      return {
        ...state,
        offline: action.offline
      }
    case UPDATE_BASE_URL:
      return {
        ...state,
        baseUrl: action.baseUrl
      }
    default:
      return state
  }
}

export default app
