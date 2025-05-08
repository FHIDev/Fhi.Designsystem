import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiIconArrowDownSelector = 'fhi-icon-arrow-down';

@customElement(FhiIconArrowDownSelector)
export class FhiIconArrowDown extends LitElement {
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
          d="M12 4.25a.75.75 0 0 1 .75.75v12.19l5.72-5.72a.75.75 0 1 1 1.06 1.06l-7 7a.75.75 0 0 1-1.06 0l-7-7a.75.75 0 1 1 1.06-1.06l5.72 5.72V5a.75.75 0 0 1 .75-.75"
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
