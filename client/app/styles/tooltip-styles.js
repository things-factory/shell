import { css } from 'lit-element'

export const TooltipStyles = css`
  /* for tooltip */
  [data-tooltip]:after {
    position: absolute;
    content: attr(data-tooltip);
    color: #fff;
    z-index: 1;
    pointer-events: none;
    display: block;
    text-transform: capitalize;

    padding: var(--tooltip-padding);
    background-color: var(--tooltip-background-color);
    font: var(--tooltip-font);
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);

    left: var(--tooltip-left-positon-left);
    top: var(--tooltip-left-position-top);
    right: var(--tooltip-left-position-right);
    animation: var(--tooltip-left-position-animation);
  }
  @keyframes tooltip-left {
    0% {
      opacity: 0;
      right: 150%;
    }
    100% {
      opacity: 1;
      right: 110%;
    }
  }
`
