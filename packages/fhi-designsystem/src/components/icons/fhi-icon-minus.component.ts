
/*
  This file is auto-generated by generate-icon-components.js. Do not edit it manually.
*/
import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

export const FhiIconMinusSelector = "fhi-icon-minus";

@customElement(FhiIconMinusSelector)
export class FhiIconMinus extends LitElement {
  @property({ type: String }) color: string = "currentcolor";

  @property({ type: Number }) size: number = 24;

  render() {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${this.size}" height="${this.size}" fill="${this.color}"><path d="M19 11.25a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1 0-1.5z"/></svg>
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
