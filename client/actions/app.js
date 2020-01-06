export const UPDATE_MODULES = 'UPDATE_MODULES'
export const UPDATE_BASE_URL = 'UPDATE_BASE_URL'
export const UPDATE_CONTEXT_PATH = 'UPDATE_CONTEXT_PATH'
export const SET_DOMAINS = 'SET-DOMAINS'

export const updateDomains = domains => (dispatch, getState) => {
  dispatch({
    type: SET_DOMAINS,
    domains
  })
}
