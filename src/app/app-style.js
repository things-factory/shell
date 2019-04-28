import { css } from 'lit-element'

export const AppStyle = css`
  :host {
    display: flex;
    flex-direction: column;

    width: 100vw;
    height: 100vh;
  }

  main {
    flex: 1;
    overflow: hidden;

    display: flex;
    flex-direction: row;
  }

  #main-content {
    flex: 1;
    overflow: hidden;

    display: flex;
    flex-direction: column;
  }

  #main-content * {
    flex: 1;
  }

  #main-content *:not([active]) {
    display: none;
  }

  #sidebar-left,
  #sidebar-right {
    display: flex;
    flex-direction: column;
  }

  #sidebar-left *[hovering] {
    position: absolute;
    left: 0;
  }

  #sidebar-right *[hovering] {
    position: absolute;
    right: 0;
  }

  /* Wide layout */
  @media (min-width: 460px) {
  }
`
