import { store } from '../store'

export const UPDATE_PAGE = 'UPDATE_PAGE'
export const UPDATE_ACTIVE_PAGE = 'UPDATE_ACTIVE_PAGE'
export const UPDATE_DEFAULT_ROUTE_PAGE = 'UPDATE_DEFAULT_ROUTE_PAGE'
export const HOMEPAGE = 'index'

export const navigate = ({ pathname: path, search }) => dispatch => {
  const reg = /\/([^\/]+)\/*([^\/]*)/
  const decodePath = decodeURIComponent(path)
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

  /* overide 기능을 위해서 dependency 관계의 역순으로 route를 실행한다. */
  if (state.app.modules) {
    let modules = state.app.modules.reverse()
    for (let i in modules) {
      let factoryModule = modules[i]
      var _page = factoryModule.route && factoryModule.route(page)
      if (_page) {
        if (_page !== page) {
          // routing 된 경우는 _preLoadPage를 다시 실행한다.
          return _preLoadPage(_page)
        } else {
          return page
        }
      }
    }
  }
}

export const loadPage = (page, id, params) => dispatch => {
  page = _preLoadPage(page)

  if (!page) {
    page = 'page404'
    import('../app/pages/page-404.js')
  }

  dispatch({
    type: UPDATE_PAGE,
    page,
    resourceId: id,
    params
  })
}
