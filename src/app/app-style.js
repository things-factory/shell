import { css } from 'lit-element'

export const AppStyle = css`
  :host {
    display: flex;
    flex-direction: column;
  }

  header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .toolbar-list > a {
    display: inline-block;
    color: black;
    text-decoration: none;
    padding: 0 8px;
  }

  .toolbar-list > a[selected] {
    font-weight: bold;
  }

  /* Workaround for IE11 displaying <main> as inline */
  main {
    flex: 1;

    display: flex;
    flex-direction: row;

    width: 100vw;
    height: 100vh;
  }

  #main-content {
    flex: 1;

    display: flex;
    flex-direction: column;

    width: 100vw;
  }

  #main-content > * {
    display: none;
  }

  #main-content > *[active] {
    flex: 1;

    display: flex;
    flex-direction: column;
  }

  #sidebar-left * {
    height: 100%;
  }

  #sidebar-left *[hovering] {
    position: absolute;
    left: 0;
  }

  #sidebar-right * {
    height: 100%;
  }

  #sidebar-right *[hovering] {
    position: absolute;
    right: 0;
  }

  /* Wide layout */
  @media (min-width: 460px) {
    header {
      flex-direction: row;
    }
  }
`
