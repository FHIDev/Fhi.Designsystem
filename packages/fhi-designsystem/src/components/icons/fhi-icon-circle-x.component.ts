
/*
  This file is auto-generated by generate-icon-components.js. Do not edit it manually.
*/
import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

export const FhiIconCircleXSelector = "fhi-icon-circle-x";

@customElement(FhiIconCircleXSelector)
export class FhiIconCircleX extends LitElement {
  @property({ type: String }) color: string = "currentcolor";

  @property({ type: Number }) size: number = 24;

  render() {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${this.size}" height="${this.size}" fill="${this.color}"><path d="M21.25 12a9.25 9.25 0 1 0-18.5 0 9.25 9.25 0 0 0 18.5 0m-6.78-3.53a.75.75 0 1 1 1.06 1.06L13.06 12l2.47 2.47.052.056a.75.75 0 0 1-1.056 1.056l-.056-.052L12 13.06l-2.47 2.47a.75.75 0 1 1-1.06-1.06L10.94 12 8.47 9.53l-.052-.056a.75.75 0 0 1 1.056-1.056l.056.052L12 10.94zM22.75 12c0 5.937-4.813 10.75-10.75 10.75S1.25 17.937 1.25 12 6.063 1.25 12 1.25 22.75 6.063 22.75 12"/></svg>
    `;
  }
      
  static styles = css`
    :host {
      display: flex;
      max-height: min-content;
      max-width: min-content;
    }
  `;
  }
