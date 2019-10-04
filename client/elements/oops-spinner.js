import { LitElement, html, css } from 'lit-element'

export class OopsSpinner extends LitElement {
  static get styles() {
    return css`
      :host {
        width: 70px;
        height: 70px;
        margin: 0 auto;
        background: url(/assets/images/spinner.png) 0 0 no-repeat;
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

  render() {
    return html``
  }
}

customElements.define('oops-spinner', OopsSpinner)
