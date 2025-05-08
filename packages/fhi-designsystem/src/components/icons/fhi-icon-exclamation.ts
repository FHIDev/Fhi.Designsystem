import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiIconExclamationSelector = 'fhi-icon-exclamation';

@customElement(FhiIconExclamationSelector)
export class FhiIconExclamation extends LitElement {
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
          d="M12.75 6a.75.75 0 0 0-1.5 0v8a.75.75 0 0 0 1.5 0zM12 17a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2z"
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
