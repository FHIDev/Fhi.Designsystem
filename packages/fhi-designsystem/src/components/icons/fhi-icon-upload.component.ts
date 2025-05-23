
/*
  This file is auto-generated by generate-icon-components.js. Do not edit it manually.
*/
import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

export const FhiIconUploadSelector = "fhi-icon-upload";

@customElement(FhiIconUploadSelector)
export class FhiIconUpload extends LitElement {
  @property({ type: String }) color: string = "currentcolor";

  @property({ type: Number }) size: number = 24;

  render() {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${this.size}" height="${this.size}" fill="${this.color}"><path d="M2.25 19v-4a.75.75 0 0 1 1.5 0v4A1.25 1.25 0 0 0 5 20.25h14A1.25 1.25 0 0 0 20.25 19v-4a.75.75 0 0 1 1.5 0v4A2.75 2.75 0 0 1 19 21.75H5A2.75 2.75 0 0 1 2.25 19m9-4V4.81L7.53 8.53a.75.75 0 1 1-1.06-1.06l5-5 .056-.052a.75.75 0 0 1 1.004.052l5 5 .052.056a.75.75 0 0 1-1.056 1.056l-.056-.052-3.72-3.72V15a.75.75 0 0 1-1.5 0"/></svg>
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
