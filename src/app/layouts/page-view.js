import { LitElement, html } from 'lit-element'

export class PageView extends LitElement {
  // Only render this page if it's actually visible.
  shouldUpdate() {
    return this.active
  }

  static get properties() {
    return {
      active: Boolean
    }
  }

  get tools() {}
}
