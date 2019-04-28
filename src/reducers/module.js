import { modules } from '../module-importer.import'

const INITIAL_STATE = {
  /* FIXME. 왜 modules의 순서가 뒤집어지는 지 이해할 수 없음. */
  modules: modules.reverse()
}

const factoryModule = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default factoryModule
