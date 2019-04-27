import { UPDATE_MODULES } from '../actions/module.js'

import { modules } from '../module-importer.import'

const INITIAL_STATE = {
  modules
}

const factoryModule = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_MODULES:
      return { ...state }

    default:
      return state
  }
}

export default factoryModule
