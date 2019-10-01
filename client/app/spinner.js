import { LitElement, html, css } from 'lit-element'

import spinner from '../../assets/images/spinner.png'

export class Spinner extends LitElement {
  static get styles() {
    return css`
      :host {
        display: none;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

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
    this.style.setProperty('--background', `url(${spinner}) 0 0 no-repeat`)

    document.addEventListener('show-spinner', e => {
      this.style.display = 'block'
    })

    document.addEventListener('hide-spinner', e => {
      this.style.display = 'none'
    })
  }

  render() {
    return html``
  }
}

customElements.define('hatio-spinner', Spinner)
