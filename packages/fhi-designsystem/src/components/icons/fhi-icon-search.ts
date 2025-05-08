import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiIconSearchSelector = 'fhi-icon-search';

@customElement(FhiIconSearchSelector)
export class FhiIconSearch extends LitElement {
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
          d="M11 3.75a7.25 7.25 0 1 0 0 14.5 7.25 7.25 0 0 0 0-14.5M2.25 11a8.75 8.75 0 1 1 15.445 5.634l3.835 3.836a.75.75 0 1 1-1.06 1.06l-3.836-3.835A8.75 8.75 0 0 1 2.25 11"
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
