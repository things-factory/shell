import { css } from 'lit-element'

export const AppStyle = css`
  :host {
    display: grid;

    grid-template-rows: var(--app-grid-template-rows, auto 1fr auto);
    grid-template-columns: var(--app-grid-template-columns, auto 1fr auto);
    grid-template-areas: var(--app-grid-template-area, 'header header header' 'nav main aside' 'nav footer aside');
    grid-gap: var(--app-grid-gap, 0em);

    width: 100vw;
    height: 100vh;
  }

  header-bar {
    grid-area: header;
  }

  nav-bar {
    grid-area: nav;
  }

  main {
    grid-area: main;

    overflow: hidden;

    display: flex;
    flex-direction: row;
  }

  aside-bar {
    grid-area: aside;
  }

  footer-bar {
    grid-area: footer;
  }

  main * {
    flex: 1;
  }

  main *:not([active]) {
    display: none;
  }

  [hidden] {
    display: none;
  }
  /* Wide layout */
  @media (min-width: 460px) {
  }

  @media print {
    :host {
      width: 100%;
      height: 100%;
      min-height: 100vh;
    }
  }
`
