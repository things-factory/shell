import debounce from 'lodash/debounce'
export default superclass => {
  return class A extends superclass {
    constructor() {
      super()

      this._infiniteScrollOptions = {
        threshold: 20,
        limit: 30,
        totalProp: '_total',
        pageProp: '_page'
      }

      this.onScroll = debounce(e => {
        var el = this.scrollTargetEl
        var { threshold = 0, limit, totalProp, pageProp } = this._infiniteScrollOptions

        if (this[pageProp] < this[totalProp] / limit && el.scrollHeight - el.clientHeight <= el.scrollTop + threshold) {
          this.scrollAction()
        }
      }, 300)
    }

    get scrollTargetEl() {
      console.warn('scroll target element is not defined.')
    }

    async scrollAction() {
      console.warn('scroll action not implemented.')
    }
  }
}
