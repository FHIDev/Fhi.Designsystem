import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiIconLinkSelector = 'fhi-icon-link';

@customElement(FhiIconLinkSelector)
export class FhiIconLink extends LitElement {
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
          d="M13.53 4.53c1.7-1.7 4.293-1.646 5.94 0 1.646 1.647 1.7 4.24 0 5.94l-2.5 2.5c-1.707 1.707-4.233 1.707-5.94 0l-.5-.5a.75.75 0 1 0-1.06 1.06l.5.5c2.293 2.293 5.768 2.293 8.06 0l2.5-2.5c2.3-2.3 2.22-5.841 0-8.06-2.219-2.22-5.76-2.3-8.06 0l-1.5 1.5a.75.75 0 0 0 1.06 1.06zm.5 5.44c-2.293-2.293-5.767-2.293-8.06 0l-2.5 2.5c-2.3 2.3-2.22 5.841 0 8.06 2.219 2.22 5.76 2.3 8.06 0l1.5-1.5a.75.75 0 0 0-1.06-1.06l-1.5 1.5c-1.7 1.7-4.293 1.646-5.94 0-1.646-1.647-1.7-4.24 0-5.94l2.5-2.5c1.707-1.707 4.233-1.707 5.94 0l.5.5a.75.75 0 1 0 1.06-1.06z"
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
