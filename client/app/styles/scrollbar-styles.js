import { css } from 'lit-element'

export const ScrollbarStyles = css`
  /* for scroller */
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-thumb-color, rgba(0, 0, 0, 0.2));
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: var(--scrollbar-thumb-hover-color, #aa866a);
  }
`
