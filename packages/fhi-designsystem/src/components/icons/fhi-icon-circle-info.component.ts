
/*
  This file is auto-generated by generate-icon-components.js. Do not edit it manually.
*/
import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

export const FhiIconCircleInfoSelector = "fhi-icon-circle-info";

@customElement(FhiIconCircleInfoSelector)
export class FhiIconCircleInfo extends LitElement {
  @property({ type: String }) color: string = "currentcolor";

  @property({ type: Number }) size: number = 24;

  render() {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${this.size}" height="${this.size}" fill="${this.color}"><path fill-rule="evenodd" d="M12 2.75a9.25 9.25 0 1 1 0 18.5 9.25 9.25 0 0 1 0-18.5m0 20c5.937 0 10.75-4.813 10.75-10.75S17.937 1.25 12 1.25 1.25 6.063 1.25 12 6.063 22.75 12 22.75m-.75-10.5v3h-.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-.75V11.5a.75.75 0 0 0-.673-.746L12 10.75h-1.5a.75.75 0 0 0 0 1.5zm.862-5.245L12.01 7H12a1 1 0 1 0 0 2h.01l.102-.005a1 1 0 0 0 0-1.99" clip-rule="evenodd"/></svg>
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
