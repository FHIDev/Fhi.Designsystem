
/*
  This file is auto-generated by generate-icon-components.js. Do not edit it manually.
*/
import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

export const FhiIconEyeSelector = "fhi-icon-eye";

@customElement(FhiIconEyeSelector)
export class FhiIconEye extends LitElement {
  @property({ type: String }) color: string = "currentcolor";

  @property({ type: Number }) size: number = 24;

  render() {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${this.size}" height="${this.size}" fill="${this.color}"><path d="M12 4.25a11.5 11.5 0 0 1 10.461 6.725l.17.39.01.026.048.149a1.75 1.75 0 0 1 0 .92l-.048.149-.01.025a11.5 11.5 0 0 1-10.205 7.108l-.425.008a11.5 11.5 0 0 1-10.462-6.725l-.17-.39-.01-.026a1.75 1.75 0 0 1 0-1.218l.01-.025.17-.39A11.5 11.5 0 0 1 12 4.25m0 1.5a10 10 0 0 0-9.238 6.17.25.25 0 0 0 .001.16 10 10 0 0 0 9.238 6.17l.37-.007a10 10 0 0 0 8.865-6.162.25.25 0 0 0 0-.161 10 10 0 0 0-9.235-6.17M14.25 12a2.25 2.25 0 1 0-4.5.001 2.25 2.25 0 0 0 4.5-.001m1.5 0a3.75 3.75 0 1 1-7.5-.001 3.75 3.75 0 0 1 7.5 0"/></svg>
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
