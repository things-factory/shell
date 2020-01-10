import {
  UPDATE_PAGE,
  UPDATE_CONTEXT,
  UPDATE_ACTIVE_PAGE,
  REGISTER_NAVIGATION_CALLBACK,
  UNREGISTER_NAVIGATION_CALLBACK
} from '../actions/route.js'
import { updateMetadata } from 'pwa-helpers/metadata.js'
import startCase from 'lodash/startCase'

const APP_TITLE_EL = document.querySelector('meta[name="application-name"]')
var appTitle
if(APP_TITLE_EL) appTitle = APP_TITLE_EL.content


const INITIAL_STATE = {
  page: '',
  resourceId: '',
  params: {},
  activePage: null,
  context: {},
  callbacks: []
}

const route = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return {
        ...state,
        page: action.page,
        resourceId: action.resourceId,
        params: action.params
      }
    case UPDATE_CONTEXT:
      updateMetadata({
        title: appTitle + (action.context && action.context.title ? ` - ${startCase(action.context.title)}` : '')
      })
      return {
        ...state,
        context: action.context || (state.activePage && state.activePage.context) || {}
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
