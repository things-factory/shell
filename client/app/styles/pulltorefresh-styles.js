import { css } from 'lit-element'

export const PullToRefreshStyles = css`
  .ptr--ptr {
    box-shadow: inset 0 -3px 5px rgba(0, 0, 0, 0.12);
    pointer-events: none;
    font-size: 0.85em;
    font-weight: bold;
    top: 0;
    height: 0;
    transition: height 0.3s, min-height 0.3s;
    text-align: center;
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
    align-content: stretch;
  }
  .ptr--box {
    padding: 10px;
    flex-basis: 100%;
  }
  .ptr--pull {
    transition: none;
  }
  .ptr--text {
    margin-top: 0.33em;
    color: rgba(0, 0, 0, 0.3);
  }
  .ptr--icon {
    color: rgba(0, 0, 0, 0.3);
    transition: transform 0.3s;
  }
  .ptr--top {
    touch-action: pan-x pan-down pinch-zoom;
  }
  .ptr--release {
    .ptr--icon {
      transform: rotate(180deg);
    }
  }
`
