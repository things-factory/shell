import { LicenseChecker } from '@hatiolab/license-checker'
import { html, LitElement } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { updateMetadata } from 'pwa-helpers/metadata.js'
import { installRouter } from 'pwa-helpers/router.js'
import { UPDATE_MODULES } from '../actions/app'
import { UPDATE_LICENSE_INFO, UPDATE_LICENSE_KEY, UPDATE_LICENSE_VALIDITY } from '../actions/license'
import { navigateWithSilence, UPDATE_ACTIVE_PAGE } from '../actions/route'
import { unsubscribe } from '../serviceworker'
import { store } from '../store'
import { AppStyle } from './app-style'
import { ScrollbarStyles } from './styles/scrollbar-styles'

class ThingsApp extends connect(store)(LitElement) {
  static get properties() {
    return {
      appTitle: String,
      _page: String,
      _resourceId: String,
      _params: Object,
      _callbacks: Array,
      _activePage: Object,
      _context: Object,
      _modules: Array
    }
  }

  static get styles() {
    return [ScrollbarStyles, AppStyle]
  }

  render() {
    var params = this._params || {}
    var fullbleed = (this._context && this._context.fullbleed) || (params.fullbleed && params.fullbleed == 'Y')

    return html`
      <header-bar ?hidden=${fullbleed}></header-bar>

      <nav-bar ?hidden=${fullbleed}></nav-bar>

      <main></main>

      <aside-bar ?hidden=${fullbleed}></aside-bar>

      <footer-bar ?hidden=${fullbleed}></footer-bar>
    `
  }

  constructor() {
    super()

    if (window.ThingsLicense)
      LicenseChecker.setKey(ThingsLicense).then(key => {
        store.dispatch({
          type: UPDATE_LICENSE_KEY,
          key: key
        })
      })
    else console.warn('License file not found.')
  }

  connectedCallback() {
    super.connectedCallback()
    // unsubscribe()

    /* 모듈 임포트를 동적으로 처리한다. */
    import('../module-importer.import').then(module => {
      var modules = module.modules

      /* lifecycle - bootstrapping */
      this.dispatchEvent(new Event('lifecycle-bootstrap-begin'))
      modules.forEach((m, idx) => {
        try {
          m.bootstrap && m.bootstrap()
          console.info(`[${idx} BOOTSTRAPED - ${m.name}]`)
        } catch (e) {
          console.error(`[${idx} BOOTSTRAP ERROR -${m.name}]`, e)
        }
      })
      this.dispatchEvent(new Event('lifecycle-bootstrap-finish'))

      /* shouldUpdate를 활성화한다. */
      this._moduleInitialized = true

      /* modules를 store에 dispatch 함으로써, update를 invoke 시킨다. */
      store.dispatch({
        type: UPDATE_MODULES,
        modules
      })

      installRouter((location, e) => {
        store.dispatch(navigateWithSilence(location))
        this._callbacks &&
          this._callbacks.forEach(callback => {
            try {
              callback.call(this, location, e)
            } catch (ex) {
              console.error(ex)
            }
          })
      })
    })
  }

  routeToPage() {
    const pageTitle = this.appTitle + ' - ' + this._page

    updateMetadata({
      title: pageTitle,
      description: pageTitle
      // This object also takes an image property, that points to an img src.
    })

    let activePages = this.shadowRoot.querySelectorAll('main > .page[active]')
    activePages.forEach(page => {
      page.removeAttribute('active')
    })

    this._activePage = this.shadowRoot.querySelector(`main > .page[data-page=${this._page}]`)
    if (this._activePage) {
      this._activePage.setAttribute('active', true)
      this._activePage.lifecycle = {
        ...(this._activePage.lifecycle || {}),
        active: true,
        params: this._params,
        resourceId: this._resourceId,
        page: this._page
      }
    }

    store.dispatch({
      type: UPDATE_ACTIVE_PAGE,
      activePage: this._activePage
    })
  }

  async updated(changedProps) {
    if (changedProps.has('_modules')) {
      this._appendFactoryModulePages()
    }

    if (changedProps.has('_page') || changedProps.has('_resourceId') || changedProps.has('_params')) {
      this.routeToPage()
    }
  }

  shouldUpdate() {
    return this._moduleInitialized
  }

  stateChanged(state) {
    this._page = state.route.page
    this._params = state.route.params
    this._resourceId = state.route.resourceId
    this._callbacks = state.route.callbacks
    this._context = state.route.context
    this._modules = state.app.modules

    LicenseChecker.checkValidity().then(info => {
      if (!info) return
      var { validity, licenseInfo } = info
      store.dispatch({
        type: UPDATE_LICENSE_VALIDITY,
        validity: validity
      })
      store.dispatch({
        type: UPDATE_LICENSE_INFO,
        licenseInfo
      })
    })
  }

  _appendFactoryModulePages() {
    var main = this.shadowRoot.querySelector('main')
    var reversedModules = [...this._modules].reverse()
    var pages = {}

    /* 모듈 참조 순서 역순으로 page를 추가한다. (for overidable) */
    reversedModules.forEach(m => {
      m.routes &&
        m.routes.forEach(route => {
          if (pages[route.page]) {
            /* 이미 추가된 page는 추가하지 않는다. */
            return
          }
          var el = document.createElement(route.tagname)
          el.setAttribute('class', 'page')
          el.setAttribute('data-page', route.page)

          main.appendChild(el)
          pages[route.page] = true
        })
    })
  }
}

window.customElements.define('things-app', ThingsApp)
