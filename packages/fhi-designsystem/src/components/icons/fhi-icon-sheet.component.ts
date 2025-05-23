
/*
  This file is auto-generated by generate-icon-components.js. Do not edit it manually.
*/
import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

export const FhiIconSheetSelector = "fhi-icon-sheet";

@customElement(FhiIconSheetSelector)
export class FhiIconSheet extends LitElement {
  @property({ type: String }) color: string = "currentcolor";

  @property({ type: Number }) size: number = 24;

  render() {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${this.size}" height="${this.size}" fill="${this.color}"><path d="M20.25 15.75h-4.5v4.5H19c.69 0 1.25-.56 1.25-1.25zm-10.5 4.5h4.5v-4.5h-4.5zm6-6h4.5v-4.5h-4.5zm-6 0h4.5v-4.5h-4.5zm-6 0h4.5v-4.5h-4.5zm0 4.75c0 .69.56 1.25 1.25 1.25h3.25v-4.5h-4.5zm16.5-14c0-.69-.56-1.25-1.25-1.25H5c-.69 0-1.25.56-1.25 1.25v3.25h16.5zm1.5 14A2.75 2.75 0 0 1 19 21.75H5A2.75 2.75 0 0 1 2.25 19V5A2.75 2.75 0 0 1 5 2.25h14A2.75 2.75 0 0 1 21.75 5z"/></svg>
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
