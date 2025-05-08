import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiIconSheetSelector = 'fhi-icon-sheet';

@customElement(FhiIconSheetSelector)
export class FhiIconSheet extends LitElement {
  @property({ type: String }) color: string =
    'var(--fhi-color-neutral-text-default)';

  @property({ type: Number }) size: number = 24;

  render() {
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="${this.size}"
        height="${this.size}"
        fill="${this.color}"
      >
        <path
          fill-rule="evenodd"
          d="M5 3.75c-.69 0-1.25.56-1.25 1.25v3.25h16.5V5c0-.69-.56-1.25-1.25-1.25zM21.75 9V5A2.75 2.75 0 0 0 19 2.25H5A2.75 2.75 0 0 0 2.25 5v14A2.75 2.75 0 0 0 5 21.75h14A2.75 2.75 0 0 0 21.75 19zm-1.5.75h-4.5v4.5h4.5zm0 6h-4.5v4.5H19c.69 0 1.25-.56 1.25-1.25zm-6 4.5v-4.5h-4.5v4.5zm-6 0v-4.5h-4.5V19c0 .69.56 1.25 1.25 1.25zm-4.5-6h4.5v-4.5h-4.5zm6-4.5v4.5h4.5v-4.5z"
          clip-rule="evenodd"
        />
      </svg>
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
