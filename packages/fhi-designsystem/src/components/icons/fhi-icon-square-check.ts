import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiIconSquareCheckSelector = 'fhi-icon-square-check';

@customElement(FhiIconSquareCheckSelector)
export class FhiIconSquareCheck extends LitElement {
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
          d="M3.75 5c0-.69.56-1.25 1.25-1.25h14c.69 0 1.25.56 1.25 1.25v14c0 .69-.56 1.25-1.25 1.25H5c-.69 0-1.25-.56-1.25-1.25zM5 2.25A2.75 2.75 0 0 0 2.25 5v14A2.75 2.75 0 0 0 5 21.75h14A2.75 2.75 0 0 0 21.75 19V5A2.75 2.75 0 0 0 19 2.25zm10.53 8.28a.75.75 0 1 0-1.06-1.06L11 12.94l-1.47-1.47a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0z"
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
