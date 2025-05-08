import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiIconEyeOffSelector = 'fhi-icon-eye-off';

@customElement(FhiIconEyeOffSelector)
export class FhiIconEyeOff extends LitElement {
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
          d="M1.47 1.47a.75.75 0 0 1 1.06 0l20 20a.75.75 0 1 1-1.06 1.06l-4.107-4.107A11.5 11.5 0 0 1 1.359 12.61a1.75 1.75 0 0 1 .01-1.243 11.5 11.5 0 0 1 3.956-4.98L1.47 2.53a.75.75 0 0 1 0-1.06m4.933 5.993a10 10 0 0 0-3.64 4.459.25.25 0 0 0 0 .156 10 10 0 0 0 13.481 5.227l-2.176-2.177a3.75 3.75 0 0 1-5.196-5.196zM9.97 11.03a2.25 2.25 0 0 0 3 3zm7.092-3.905a10 10 0 0 0-6.24-1.304.75.75 0 1 1-.178-1.49 11.494 11.494 0 0 1 11.987 7.034l.006.013.004.012a1.75 1.75 0 0 1-.01 1.243c-.393.953-.912 1.85-1.544 2.664a.75.75 0 1 1-1.186-.92 10 10 0 0 0 1.337-2.3.25.25 0 0 0 0-.156 10 10 0 0 0-4.176-4.796"
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
