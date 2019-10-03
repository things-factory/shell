import { LitElement, html, css } from 'lit-element'

import spinner from '../../assets/images/spinner.png'
const BACKGROUND = `url(${spinner}) 0 0 no-repeat`

export class OopsSpinner extends LitElement {
  static get styles() {
    return css`
      :host {
        width: 70px;
        height: 70px;
        margin: 0 auto;
        background: var(--background);
        background-size: 700%;
        animation: spinner steps(6) 2s infinite both;
      }

      @keyframes spinner {
        0% {
          background-position: 0%;
        }
        100% {
          background-position: 100%;
        }
      }
    `
  }

  connectedCallback() {
    this.style.setProperty('--background', BACKGROUND)
  }

  render() {
    return html``
  }
}

customElements.define('oops-spinner', OopsSpinner)
