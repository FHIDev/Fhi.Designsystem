import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiIconLockSelector = 'fhi-icon-lock';

@customElement(FhiIconLockSelector)
export class FhiIconLock extends LitElement {
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
          d="M12 2.75A4.25 4.25 0 0 0 7.75 7v3.25h8.5V7A4.25 4.25 0 0 0 12 2.75m5.75 7.5V7a5.75 5.75 0 0 0-11.5 0v3.25H5A2.75 2.75 0 0 0 2.25 13v7A2.75 2.75 0 0 0 5 22.75h14A2.75 2.75 0 0 0 21.75 20v-7A2.75 2.75 0 0 0 19 10.25zm-.75 1.5H5c-.69 0-1.25.56-1.25 1.25v7c0 .69.56 1.25 1.25 1.25h14c.69 0 1.25-.56 1.25-1.25v-7c0-.69-.56-1.25-1.25-1.25z"
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
