import { html, css, LitElement, property } from 'lit-element'

import '../layouts/page-toolbar'

import { SharedStyles } from '../styles/shared-styles'

class MenuList extends LitElement {
  static get styles() {
    return [
      SharedStyles,
      css`
        #main {
          display: flex;
          flex-flow: row wrap;
          justify-content: center;
        }
        #main > ul {
          padding: 0;
          margin: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          width: var(--menu-list-column-width);
          margin: var(--menu-list-column-margin);
        }
        #main > ul > li {
          border: 1px solid #ccc;
          margin: var(--menu-list-item-margin);
        }
      `
    ]
  }

  // @property({ type: Number })
  // columnWidth = 320
  // @property({ type: Array })
  // items = []
  // @property({ type: Number })
  // _columnCount = 1
  // @property({ type: Array })
  // _columns = []

  static get properties() {
    return {
      columnWidth: {
        type: Number
      },
      columnCount: {
        type: Number
      },
      items: {
        type: Array
      },
      _columnCount: {
        type: Number
      },
      _columns: {
        type: Array
      }
    }
  }

  render() {
    return html`
      <style>
        :host {
          --menu-list-item-margin: ${this.itemGap}px 0;
          --menu-list-column-margin: 0 ${this.columnGap}px;
          --menu-list-column-width: ${this.columnWidth}px;
        }
      </style>
      <page-toolbar></page-toolbar>

      <section id="main">
        ${this._columns.map(
          c => html`
            <ul>
              ${c.map(
                i =>
                  html`
                    <li style="height: ${i.height}px">
                      <a href=${['/list', '/board', '/form', '/player', '/tester'][Math.round(Math.random() * 100) % 5]}
                        >${i.text}</a
                      >
                    </li>
                  `
              )}
            </ul>
          `
        )}
      </section>
    `
  }

  constructor() {
    super()

    this.columnWidth = 320
    this.maxColumnCount = 5
    this.columnGap = 5
    this.itemGap = 5
    this.items = []
    this._columnCount = 1

    this._columns = []
  }

  firstUpdated() {
    for (var i = 0; i < 30; i++) {
      this.items.push({
        height: Math.round(Math.random() * 400) + 100,
        text: i
      })
    }

    var ro = new ResizeObserver(entries => {
      for (let entry of entries) {
        const cr = entry.contentRect
        this.calculateColumnCount()
        this.distributeColumnItems()
      }
    })

    // Observe one or multiple elements
    ro.observe(this.shadowRoot.getElementById('main'))
  }

  distributeColumnItems() {
    var columns = []

    this.items.forEach((item, idx) => {
      if (!columns[idx % this._columnCount]) columns[idx % this._columnCount] = []

      columns[idx % this._columnCount].push(item)
    })

    this._columns = columns

    this.requestUpdate()
  }

  calculateColumnCount() {
    var mainEl = this.shadowRoot.getElementById('main')
    this._columnCount = Math.min(
      Math.floor(mainEl.clientWidth / (this.columnWidth + this.columnGap * 2)),
      this.maxColumnCount
    )
  }
}

window.customElements.define('menu-list', MenuList)
