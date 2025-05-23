
/*
  This file is auto-generated by generate-icon-components.js. Do not edit it manually.
*/
import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

export const FhiIconShareSelector = "fhi-icon-share";

@customElement(FhiIconShareSelector)
export class FhiIconShare extends LitElement {
  @property({ type: String }) color: string = "currentcolor";

  @property({ type: Number }) size: number = 24;

  render() {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${this.size}" height="${this.size}" fill="${this.color}"><path d="M20.25 19a2.25 2.25 0 0 0-4.139-1.222 1 1 0 0 1-.043.09 1 1 0 0 1-.058.083A2.25 2.25 0 1 0 20.25 19m-12-7a2.25 2.25 0 1 0-4.5 0 2.25 2.25 0 0 0 4.5 0m12-7a2.25 2.25 0 1 0-4.5 0 2.25 2.25 0 0 0 4.5 0m1.5 0a3.75 3.75 0 0 1-6.546 2.498l-5.653 3.299a3.74 3.74 0 0 1 0 2.405l5.656 3.295a3.75 3.75 0 1 1-.758 1.295l-5.654-3.294a3.75 3.75 0 1 1 0-4.997l5.653-3.299A3.75 3.75 0 1 1 21.75 5"/></svg>
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
