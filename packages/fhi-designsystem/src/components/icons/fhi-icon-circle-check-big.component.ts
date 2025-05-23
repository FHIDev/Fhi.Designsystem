
/*
  This file is auto-generated by generate-icon-components.js. Do not edit it manually.
*/
import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

export const FhiIconCircleCheckBigSelector = "fhi-icon-circle-check-big";

@customElement(FhiIconCircleCheckBigSelector)
export class FhiIconCircleCheckBig extends LitElement {
  @property({ type: String }) color: string = "currentcolor";

  @property({ type: Number }) size: number = 24;

  render() {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${this.size}" height="${this.size}" fill="${this.color}"><path d="M9.63 1.509a10.75 10.75 0 0 1 6.345.497l.4.169.068.035a.75.75 0 0 1-.607 1.362l-.072-.027-.343-.146A9.25 9.25 0 1 0 21.25 12v-.92a.75.75 0 1 1 1.5 0V12l-.009.435A10.751 10.751 0 1 1 9.631 1.509m11.896 1.909A.75.75 0 0 1 22.53 4.53l-10 10a.75.75 0 0 1-1.06 0l-3-3-.052-.056a.75.75 0 0 1 1.055-1.056l.057.052L12 12.94l9.47-9.47z"/></svg>
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
