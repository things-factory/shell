import {
  UPDATE_PAGE,
  UPDATE_CONTEXT,
  UPDATE_ACTIVE_PAGE,
  UPDATE_DEFAULT_ROUTE_PAGE,
  REGISTER_NAVIGATION_CALLBACK,
  UNREGISTER_NAVIGATION_CALLBACK,
  HOMEPAGE
} from '../actions/route.js'

const INITIAL_STATE = {
  page: '',
  resourceId: '',
  params: {},
  activePage: null,
  context: {},
  callbacks: [],
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

    case REGISTER_NAVIGATION_CALLBACK:
      return {
        ...state,
        callbacks: [...state.callbacks, action.callback]
      }
    case UNREGISTER_NAVIGATION_CALLBACK:
      return {
        ...state,
        callbacks: state.callbacks.filter(callback => callback !== action.callback)
      }

    default:
      return state
  }
}

export default route
