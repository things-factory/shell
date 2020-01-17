import { LitElement, html, css } from 'lit-element'

export class PullToRefreshControl extends LitElement {
  static get styles() {
    return css`
      :host {
        position: absolute;
        top: -50px;
        left: 50%;
        -webkit-transform: translate3d(-50%, 0, 0);
        transform: translate3d(-50%, 0, 0);
        width: 40px;
        height: 40px;
        justify-content: center;
        align-items: center;
        background: #fff;
        border-radius: 50%;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.117647), 0 1px 4px rgba(0, 0, 0, 0.117647);
        display: none;

        z-index: 10000;
      }

      :host(.pull-to-refresh--pulling),
      :host(.pull-to-refresh--aborting),
      :host(.pull-to-refresh--reached),
      :host(.pull-to-refresh--refreshing),
      :host(.pull-to-refresh--restoring) {
        display: flex;
      }

      :host(.pull-to-refresh--pulling) .pull-to-refresh-material__spinner,
      :host(.pull-to-refresh--aborting) .pull-to-refresh-material__spinner,
      :host(.pull-to-refresh--reached) .pull-to-refresh-material__spinner,
      :host(.pull-to-refresh--refreshing) .pull-to-refresh-material__icon,
      :host(.pull-to-refresh--restoring) .pull-to-refresh-material__icon {
        display: none;
      }

      .pull-to-refresh-material__spinner {
        -webkit-transform-origin: center center;
        transform-origin: center center;
        -webkit-animation: pull-to-refresh-material-rotate 2s linear infinite;
        animation: pull-to-refresh-material-rotate 2s linear infinite;
      }

      .pull-to-refresh-material__path {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        stroke-linecap: round;
        -webkit-animation: pull-to-refresh-material-dash 1.5s ease-in-out infinite;
        animation: pull-to-refresh-material-dash 1.5s ease-in-out infinite;
      }

      .pull-to-refresh-material__path--colorful {
        -webkit-animation: pull-to-refresh-material-dash 1.5s ease-in-out infinite,
          pull-to-refresh-material-colorful 6s ease-in-out infinite;
        animation: pull-to-refresh-material-dash 1.5s ease-in-out infinite,
          pull-to-refresh-material-colorful 6s ease-in-out infinite;
      }

      @-webkit-keyframes pull-to-refresh-material-rotate {
        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }

      @keyframes pull-to-refresh-material-rotate {
        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }

      @-webkit-keyframes pull-to-refresh-material-dash {
        0% {
          stroke-dasharray: 1, 200;
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: 89, 200;
          stroke-dashoffset: -35px;
        }
        100% {
          stroke-dasharray: 89, 200;
          stroke-dashoffset: -124px;
        }
      }

      @keyframes pull-to-refresh-material-dash {
        0% {
          stroke-dasharray: 1, 200;
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: 89, 200;
          stroke-dashoffset: -35px;
        }
        100% {
          stroke-dasharray: 89, 200;
          stroke-dashoffset: -124px;
        }
      }

      @-webkit-keyframes pull-to-refresh-material-colorful {
        100%,
        0% {
          stroke: #4285f4;
        }
        40% {
          stroke: #ea4335;
        }
        66% {
          stroke: #fbbc05;
        }
        80%,
        90% {
          stroke: #34a853;
        }
      }

      @keyframes pull-to-refresh-material-colorful {
        100%,
        0% {
          stroke: #4285f4;
        }
        40% {
          stroke: #ea4335;
        }
        66% {
          stroke: #fbbc05;
        }
        80%,
        90% {
          stroke: #34a853;
        }
      }
    `
  }

  render() {
    return html`
      <svg class="pull-to-refresh-material__icon" fill="#4285f4" width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
        />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>

      <svg class="pull-to-refresh-material__spinner" width="24" height="24" viewBox="25 25 50 50">
        <circle
          class="pull-to-refresh-material__path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke="#4285f4"
          stroke-width="4"
          stroke-miterlimit="10"
        />
      </svg>
    `
  }

  pulling(d, opts) {
    const { threshold } = opts

    let p = d / threshold
    if (p > 1) p = 1
    else p = p * p * p
    const y = d / 2.5

    this.style.opacity = p
    this.style.transform = y ? `translate3d(-50%, ${y}px, 0) rotate(${360 * p}deg)` : ''
  }

  refreshing({ threshold }) {
    this.style.transition = 'transform 0.2s'
    this.style.transform = `translate3d(-50%, ${threshold / 2.5}px, 0)`
  }

  aborting() {
    return new Promise(resolve => {
      if (this.style.transform) {
        this.style.transition = 'transform 0.3s, opacity 0.15s'
        this.style.transform = 'translate3d(-50%, 0, 0)'
        this.style.opacity = 0
        this.addEventListener('transitionend', () => {
          this.style.transition = ''
          resolve()
        })
      } else {
        resolve()
      }
    })
  }

  restoring() {
    return new Promise(resolve => {
      this.style.transition = 'transform 0.3s'
      this.style.transform += ' scale(0.01)'
      this.addEventListener('transitionend', () => {
        this.style.transition = ''
        resolve()
      })
    })
  }
}

customElements.define('pulltorefresh-control', PullToRefreshControl)
