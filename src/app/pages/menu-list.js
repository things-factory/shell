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
          flex: 1;
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
      columnConfig: Object,
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
        }

        @media (max-width: 600px) {
          :host {
            --menu-list-item-margin: 0;
            --menu-list-column-margin: 0;
          }
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
                      <a
                        href=${['/list', '/board', '/form', '/player', '/tester', 'grid-list'][
                          Math.round(Math.random() * 100) % 5
                        ]}
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

    this.columnConfig = {
      600: 3,
      1200: 4,
      1800: 5,
      2400: 6
    }

    this._columns = []

    window.addEventListener('resize', this.onResize.bind(this))
  }

  firstUpdated() {
    for (var i = 0; i < 30; i++) {
      this.items.push({
        height: Math.round(Math.random() * 400) + 100,
        text: i
      })
    }

    this.onResize()
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

  onResize() {
    // innerWidth < width
    var columnCount = 2
    for (const width in this.columnConfig) {
      var cnt = this.columnConfig[width]
      if (innerWidth > width) {
        columnCount = cnt
      } else break
    }

    this._columnCount = columnCount
    this.distributeColumnItems()
  }
}

window.customElements.define('menu-list', MenuList)
