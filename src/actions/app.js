import { store } from '../store'
import { i18next } from '../base/i18next'

export const UPDATE_PAGE = 'UPDATE_PAGE'
export const UPDATE_OFFLINE = 'UPDATE_OFFLINE'
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR'
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'
export const UPDATE_BASE_URL = 'UPDATE_BASE_URL'
export const HOMEPAGE = 'index'

export const navigate = ({ pathname: path, search }) => dispatch => {
  const reg = /\/([^\/]+)\/*([^\/]*)/
  const decodePath = decodeURIComponent(path)
  const matchReturn = decodePath.match(reg) || []
  const page = matchReturn[1] || HOMEPAGE
  const id = matchReturn[2]
  var searchParams = new URLSearchParams(search)
  var params = {}
  searchParams.forEach((value, key) => {
    params[key] = value
  })
  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page, id, params))
}

const loadPage = (page, id, params) => dispatch => {
  switch (page) {
    case 'list':
      import('../app/pages/menu-list.js').then(module => {
        // Put code in here that you want to run every time when
        // navigating to view1 after my-view1.js is loaded.
      })
      break
    case 'grid-list':
      import('../app/pages/menu-grid-list.js').then(module => {
        // Put code in here that you want to run every time when
        // navigating to view1 after my-view1.js is loaded.
      })
      break

    default:
      let state = store.getState()
      if (state.factoryModule) {
        let modules = state.factoryModule.modules
        for (let i in modules) {
          let factoryModule = modules[i]
          var success = factoryModule.route && factoryModule.route(page)
          if (success) break
        }
      }

      if (!success) {
        page = 'page404'
        import('../app/pages/page-404.js')
      }
  }

  dispatch(updatePage(page, id, params))
}

const updatePage = (page, id, params) => {
  return {
    type: UPDATE_PAGE,
    page,
    resourceId: id,
    params
  }
}
let snackbarTimer

export const showSnackbar = message => dispatch => {
  dispatch({
    type: OPEN_SNACKBAR,
    message
  })
  window.clearTimeout(snackbarTimer)
  snackbarTimer = window.setTimeout(() => dispatch({ type: CLOSE_SNACKBAR }), 3000)
}

export const updateOffline = offline => (dispatch, getState) => {
  if (offline !== getState().app.offline) {
    dispatch(
      showSnackbar(
        i18next.t('text.you.are.now.in', {
          state: {
            text: i18next.t(offline ? 'text.offline' : 'text.online')
          }
        })
      )
    )
  }
  dispatch({
    type: UPDATE_OFFLINE,
    offline
  })
}

export const updateLayout = wide => (dispatch, getState) => {
  console.log(`The window changed to a ${wide ? 'wide' : 'narrow'} layout`)
}
