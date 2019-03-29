import { i18next } from '../app/i18next'

export const UPDATE_PAGE = 'UPDATE_PAGE'
export const UPDATE_OFFLINE = 'UPDATE_OFFLINE'
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR'
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'

import modules from '../module-importer.import'

export const navigate = path => dispatch => {
  const page = path === '/' ? 'list' : path.slice(1)

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page))
}

const loadPage = page => dispatch => {
  switch (page) {
    case 'list':
      import('../app/pages/menu-list.js').then(module => {
        // Put code in here that you want to run every time when
        // navigating to view1 after my-view1.js is loaded.
      })
      break

    case 'form':
      import('../app/pages/form-viewer.js')
      break

    case 'board':
      import('../app/pages/board-viewer.js')
      break

    case 'player':
      import('../app/pages/board-player.js')
      break
    case 'report':
      import('../app/pages/report-viewer.js')
      break

    case 'signup':
      import('@things-shell/client-auth/template-board/signup.js')
      break

    case 'signin':
      import('@things-shell/client-auth/template-board/signin.js')
      break

    case 'profile':
      import('@things-shell/client-auth/template-board/profile.js')
      break

    default:
      console.log('modules!', modules)
      for (var i in modules) {
        var module = modules[i]
        console.log('route!!!', module)
        var success = module.route(page)
        if (success) break
      }

      if (!success) {
        page = 'page404'
        import('../app/pages/page-404.js')
      }
  }

  dispatch(updatePage(page))
}

const updatePage = page => {
  return {
    type: UPDATE_PAGE,
    page
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
