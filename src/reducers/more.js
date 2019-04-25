import { TOGGLE_MORE_PANEL, ADD_MORENDA } from '../actions/more'

const INITIAL_STATE = {
  show: false,
  morendas: []
}

const more = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_MORE_PANEL:
      return {
        ...state,
        show: !state.show
      }

    case ADD_MORENDA:
      let morenda = action.morenda
      return {
        ...state,
        morendas: [...state.morendas, morenda]
      }

    default:
      return state
  }
}

export default more
