import {
  UPDATE_PAGE,
  UPDATE_OFFLINE,
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR,
  UPDATE_BASE_URL,
  UPDATE_LAYOUT
} from '../actions/app.js'

const INITIAL_STATE = {
  page: '',
  resourceId: '',
  params: {},
  offline: false,
  snackbarOpened: false,
  message: '',
  baseUrl: '', //'http://52.231.75.202/rest'
  homePage: '',
  layout: 'WIDE'
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
    case OPEN_SNACKBAR:
      return {
        ...state,
        snackbarOpened: true,
        message: action.message
      }
    case CLOSE_SNACKBAR:
      return {
        ...state,
        snackbarOpened: false
      }
    case UPDATE_BASE_URL:
      return {
        ...state,
        baseUrl: action.baseUrl
      }
    case UPDATE_LAYOUT:
      return {
        ...state,
        layout: action.layout
      }
    default:
      return state
  }
}

export default app
