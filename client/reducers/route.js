import {
  UPDATE_PAGE,
  UPDATE_CONTEXT,
  UPDATE_ACTIVE_PAGE,
  UPDATE_DEFAULT_ROUTE_PAGE,
  HOMEPAGE
} from '../actions/route.js'

const INITIAL_STATE = {
  page: '',
  resourceId: '',
  params: {},
  activePage: null,
  context: {},
  defaultRoutePage: HOMEPAGE
}

const route = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_DEFAULT_ROUTE_PAGE:
      return {
        ...state,
        defaultRoutePage: action.defaultRoutePage
      }
    case UPDATE_PAGE:
      return {
        ...state,
        page: action.page,
        resourceId: action.resourceId,
        params: action.params
      }
    case UPDATE_CONTEXT:
      return {
        ...state,
        context: action.context
      }
    case UPDATE_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.activePage
      }
    default:
      return state
  }
}

export default route
