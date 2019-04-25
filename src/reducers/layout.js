import { APPEND_SIDEBAR_LEFT, APPEND_SIDEBAR_RIGHT, APPEND_FOOTER } from '../actions/layout'

import { html } from 'lit-html'

const INITIAL_STATE = {
  sidebarLeft: [],
  sidebarRight: [],
  footer: []
}

const layout = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case APPEND_SIDEBAR_LEFT:
      let sidebarLeft = action.sidebarLeft
      return {
        ...state,
        sidebarLeft: [...state.sidebarLeft, sidebarLeft]
      }

    case APPEND_SIDEBAR_RIGHT:
      let sidebarRight = action.sidebarRight
      return {
        ...state,
        sidebarRight: [...state.sidebarRight, sidebarRight]
      }

    case APPEND_FOOTER:
      let footer = action.footer
      return {
        ...state,
        footer: [...state.footer, footer]
      }

    default:
      return state
  }
}

export default layout
