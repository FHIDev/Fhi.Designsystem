import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiIconFileSelector = 'fhi-icon-file';

@customElement(FhiIconFileSelector)
export class FhiIconFile extends LitElement {
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
          d="M4.055 2.055A2.75 2.75 0 0 1 6 1.25h9a.75.75 0 0 1 .53.22l5 5c.141.14.22.331.22.53v13A2.75 2.75 0 0 1 18 22.75H6A2.75 2.75 0 0 1 3.25 20V4c0-.73.29-1.429.805-1.945M19.19 7.25l-4.44-4.44V6A1.25 1.25 0 0 0 16 7.25zm-5.939-4.5V6A2.75 2.75 0 0 0 16 8.75h3.25V20A1.25 1.25 0 0 1 18 21.25H6A1.25 1.25 0 0 1 4.75 20V4A1.25 1.25 0 0 1 6 2.75z"
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
