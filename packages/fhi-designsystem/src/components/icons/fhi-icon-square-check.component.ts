
/*
  This file is auto-generated by generate-icon-components.js. Do not edit it manually.
*/
import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

export const FhiIconSquareCheckSelector = "fhi-icon-square-check";

@customElement(FhiIconSquareCheckSelector)
export class FhiIconSquareCheck extends LitElement {
  @property({ type: String }) color: string = "currentcolor";

  @property({ type: Number }) size: number = 24;

  render() {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${this.size}" height="${this.size}" fill="${this.color}"><path fill-rule="evenodd" d="M19 3.75c.69 0 1.25.56 1.25 1.25v14c0 .69-.56 1.25-1.25 1.25H5c-.69 0-1.25-.56-1.25-1.25V5c0-.69.56-1.25 1.25-1.25zm0 18A2.75 2.75 0 0 0 21.75 19V5A2.75 2.75 0 0 0 19 2.25H5A2.75 2.75 0 0 0 2.25 5v14A2.75 2.75 0 0 0 5 21.75zM15.53 9.47a.75.75 0 0 0-1.004-.052l-.056.052L11 12.94l-1.47-1.47-.056-.052a.75.75 0 0 0-1.056 1.056l.052.056 2 2a.75.75 0 0 0 1.06 0l4-4 .052-.056a.75.75 0 0 0-.052-1.004" clip-rule="evenodd"/></svg>
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
