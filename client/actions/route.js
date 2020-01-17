import { store } from '../store'
import { getPathInfo } from '@things-factory/utils'

export const UPDATE_PAGE = 'UPDATE_PAGE'
export const UPDATE_CONTEXT = 'UPDATE_CONTEXT'
export const UPDATE_ACTIVE_PAGE = 'UPDATE_ACTIVE_PAGE'

export const REGISTER_NAVIGATION_CALLBACK = 'REGISTER_NAVIGATION_CALLBACK'
export const UNREGISTER_NAVIGATION_CALLBACK = 'UNREGISTER_NAVIGATION_CALLBACK'

export const HOMEPAGE = ''

/**
 * 페이지를 이동하는 방법으로는 다음 두가지가 있다.
 * 1. page link를 사용하는 방법 <a href='page'>goto page</a>
 * 2. navigate('page')를 사용하는 방법
 *
 * @param string page
 */
export const navigate = (location, replace) => {
  if (replace) history.replaceState(history.state, '', location)
  else history.pushState({}, '', location)

  window.dispatchEvent(new Event('popstate'))
}

export const navigateWithSilence = ({ pathname: path, search }) => dispatch => {
  const { contextPath, path: pathname } = getPathInfo(path)

  const reg = /\/([^\/]+)\/*([^\/]*)/
  const decodePath = decodeURIComponent(pathname)
  const matchReturn = decodePath.match(reg) || []
  const page = matchReturn[1] || HOMEPAGE
  const id = matchReturn[2]
  const searchParams = new URLSearchParams(search)

  var params = {}
  searchParams.forEach((value, key) => {
    params[key] = value
  })

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page, id, params))
}

const _preLoadPage = page => {
  /*
   * _preLoadPage 에서는 page를 load하기 전처리를 수행한다.
   * 예를 들면, page dynamic import 또는 page re-routing
   */
  var state = store.getState()

  /* override 기능을 위해서 dependency 관계의 역순으로 route를 실행한다. */
  var modules = state.app.modules
  if (modules) {
    for (let i = modules.length - 1; i >= 0; i--) {
      let factoryModule = modules[i]
      let _page = factoryModule.route && factoryModule.route(page)
      if (_page) {
        return _page
      }
    }
  }
}

export const loadPage = (page, id, params) => dispatch => {
  var newPage = _preLoadPage(page)

  if (!newPage) {
    import('../app/pages/page-404.js')
    newPage = 'page404'
  } else if (page != newPage) {
    dispatch(
      navigateWithSilence({
        pathname: newPage,
        params
      })
    )
    return
  }

  dispatch({
    type: UPDATE_PAGE,
    page,
    resourceId: id,
    params
  })
}
