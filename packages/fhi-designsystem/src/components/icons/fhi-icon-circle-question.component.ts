
/*
  This file is auto-generated by generate-icon-components.js. Do not edit it manually.
*/
import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

export const FhiIconCircleQuestionSelector = "fhi-icon-circle-question";

@customElement(FhiIconCircleQuestionSelector)
export class FhiIconCircleQuestion extends LitElement {
  @property({ type: String }) color: string = "currentcolor";

  @property({ type: Number }) size: number = 24;

  render() {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${this.size}" height="${this.size}" fill="${this.color}"><path fill-rule="evenodd" d="M21.25 12a9.25 9.25 0 1 0-18.5 0 9.25 9.25 0 0 0 18.5 0m1.5 0c0 5.937-4.813 10.75-10.75 10.75S1.25 17.937 1.25 12 6.063 1.25 12 1.25 22.75 6.063 22.75 12M10.02 6.762A3.75 3.75 0 0 1 15.67 10l-.012.257c-.117 1.258-1.076 2.12-1.822 2.617a7.8 7.8 0 0 1-1.63.82l-.033.012-.006.002-.005.001-.003.001v.001h-.002l-.074.02a.75.75 0 0 1-.4-1.442h-.001l.02-.007.004-.002.076-.028a6.3 6.3 0 0 0 1.222-.626c.705-.47 1.166-1.024 1.166-1.626v-.002l-.009-.198A2.25 2.25 0 0 0 12.3 7.778a2.25 2.25 0 0 0-2.503 1.47l-.028.072a.75.75 0 0 1-1.386-.569l.123-.307a3.75 3.75 0 0 1 1.514-1.682m2.092 9.243L12.01 16H12a1 1 0 1 0 0 2h.01l.102-.005a1 1 0 0 0 0-1.99" clip-rule="evenodd"/></svg>
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
