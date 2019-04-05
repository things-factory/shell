import { UPDATE_PAGE, UPDATE_OFFLINE, OPEN_SNACKBAR, CLOSE_SNACKBAR } from '../actions/app.js'

const INITIAL_STATE = {
  page: '',
  resourceId: '',
  params: {},
  offline: false,
  snackbarOpened: false,
  message: ''
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
    default:
      return state
  }
}

export default app
