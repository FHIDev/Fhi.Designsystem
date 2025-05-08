import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiIconEyeSelector = 'fhi-icon-eye';

@customElement(FhiIconEyeSelector)
export class FhiIconEye extends LitElement {
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
          d="M12 5.75a10 10 0 0 0-9.238 6.172.25.25 0 0 0 0 .156 10 10 0 0 0 18.476 0 .25.25 0 0 0 0-.156A10 10 0 0 0 12 5.75m-6.396.444A11.5 11.5 0 0 1 22.64 11.39a1.75 1.75 0 0 1-.01 1.243 11.5 11.5 0 0 1-21.272-.025 1.75 1.75 0 0 1 .01-1.243 11.5 11.5 0 0 1 4.235-5.172M12 9.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5M8.25 12a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0"
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
