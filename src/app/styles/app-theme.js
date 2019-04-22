import { css } from 'lit-element'

export const AppTheme = css`
  :host {
    --primary-color: #826960;
    --secondary-color: #92715c;
    --third-color: #d6cec2;
    --fourth-color: #f4f4f4;
    --primary-accent-color: #ffae35;
    --secondary-accent-color: #f57f68;
    --primary-dark-color: #3b4043;
    --secondary-dark-color: #242d30;
    --third-dark-color: #919eab;
    --primary-dark-opacity15-color: rgba(0, 0, 0, 0.15);

    /* material design component themes */
    --mdc-theme-on-primary: white;
    --mdc-theme-primary: tomato;
    --mdc-theme-on-secondary: white;
    --mdc-theme-secondary: tomato;

    /* simple grid themes */
    --grid-header-background-color:#eceff4;
    --grid-header-border-color:#b9c4d7;
    --grid-record-background-color: #fff;
    --grid-record-odd-background-color: #f3f4f6;      
    --grid-footer-background-color:#93a4c3;
    --grid-header-color:#47596d;
    --grid-header-fontsize: 13px;
    --grid-record-wide-fontsize: 13px;
  }
`
