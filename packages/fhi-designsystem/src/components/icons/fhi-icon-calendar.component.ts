
/*
  This file is auto-generated by generate-icon-components.js. Do not edit it manually.
*/
import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

export const FhiIconCalendarSelector = "fhi-icon-calendar";

@customElement(FhiIconCalendarSelector)
export class FhiIconCalendar extends LitElement {
  @property({ type: String }) color: string = "currentcolor";

  @property({ type: Number }) size: number = 24;

  render() {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${this.size}" height="${this.size}" fill="${this.color}"><path d="M20.25 10.75H3.75V20c0 .69.56 1.25 1.25 1.25h14c.69 0 1.25-.56 1.25-1.25zm-5-4.75V4.75h-6.5V6a.75.75 0 0 1-1.5 0V4.75H5c-.69 0-1.25.56-1.25 1.25v3.25h16.5V6c0-.69-.56-1.25-1.25-1.25h-2.25V6a.75.75 0 0 1-1.5 0m6.5 14A2.75 2.75 0 0 1 19 22.75H5A2.75 2.75 0 0 1 2.25 20V6A2.75 2.75 0 0 1 5 3.25h2.25V2a.75.75 0 0 1 1.5 0v1.25h6.5V2a.75.75 0 0 1 1.5 0v1.25H19A2.75 2.75 0 0 1 21.75 6z"/></svg>
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
