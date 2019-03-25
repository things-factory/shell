export const UPDATE_PAGE = 'UPDATE_PAGE'
export const UPDATE_OFFLINE = 'UPDATE_OFFLINE'
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR'
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'

export const navigate = path => dispatch => {
  // Extract the page name from path.
  const page = path === '/' ? 'page1' : path.slice(1)

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page))
}

const loadPage = page => dispatch => {
  switch (page) {
    case 'page1':
      import('../app/pages/my-page1.js').then(module => {
        // Put code in here that you want to run every time when
        // navigating to view1 after my-view1.js is loaded.
      })
      break
    case 'page2':
      import('../app/pages/my-page2.js')
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
      page = 'page404'
      import('../app/pages/my-page404.js')
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

export const showSnackbar = () => dispatch => {
  dispatch({
    type: OPEN_SNACKBAR
  })
  window.clearTimeout(snackbarTimer)
  snackbarTimer = window.setTimeout(() => dispatch({ type: CLOSE_SNACKBAR }), 3000)
}

export const updateOffline = offline => (dispatch, getState) => {
  // Show the snackbar only if offline status changes.
  if (offline !== getState().app.offline) {
    dispatch(showSnackbar())
  }
  dispatch({
    type: UPDATE_OFFLINE,
    offline
  })
}

export const updateLayout = wide => (dispatch, getState) => {
  console.log(`The window changed to a ${wide ? 'wide' : 'narrow'} layout`)
}
