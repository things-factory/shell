import { UPDATE_LICENSE_INFO, UPDATE_LICENSE_KEY, UPDATE_LICENSE_VALIDITY } from '../actions/license.js'

const INITIAL_STATE = {
  key: '',
  licenseInfo: {},
  validity: false
}

const license = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_LICENSE_KEY:
      return {
        ...state,
        key: action.key
      }
    case UPDATE_LICENSE_INFO:
      return {
        ...state,
        licenseInfo: action.licenseInfo
      }
    case UPDATE_LICENSE_VALIDITY:
      return {
        ...state,
        validity: action.validity
      }

    default:
      return state
  }
}

export default license
