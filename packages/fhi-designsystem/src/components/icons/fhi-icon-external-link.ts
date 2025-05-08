import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiIconExternalLinkSelector = 'fhi-icon-external-link';

@customElement(FhiIconExternalLinkSelector)
export class FhiIconExternalLink extends LitElement {
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
          d="M14.25 3a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0V4.81l-9.72 9.72a.75.75 0 1 1-1.06-1.06l9.72-9.72H15a.75.75 0 0 1-.75-.75M5 6.75A1.25 1.25 0 0 0 3.75 8v11A1.25 1.25 0 0 0 5 20.25h11A1.25 1.25 0 0 0 17.25 19v-6a.75.75 0 0 1 1.5 0v6A2.75 2.75 0 0 1 16 21.75H5A2.75 2.75 0 0 1 2.25 19V8A2.75 2.75 0 0 1 5 5.25h6a.75.75 0 0 1 0 1.5z"
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
