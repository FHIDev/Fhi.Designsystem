import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiIconArrowUpLeftSelector = 'fhi-icon-arrow-up-left';

@customElement(FhiIconArrowUpLeftSelector)
export class FhiIconArrowUpLeft extends LitElement {
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
          d="M6.25 7A.75.75 0 0 1 7 6.25h10a.75.75 0 0 1 0 1.5H8.81l8.72 8.72a.75.75 0 1 1-1.06 1.06L7.75 8.81V17a.75.75 0 0 1-1.5 0z"
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
