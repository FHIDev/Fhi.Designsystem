import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiIconTrashSelector = 'fhi-icon-trash';

@customElement(FhiIconTrashSelector)
export class FhiIconTrash extends LitElement {
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
          d="M9.155 3.155c-.27.27-.405.589-.405.845v1.25h6.5V4c0-.256-.136-.575-.405-.845-.27-.27-.589-.405-.845-.405h-4c-.256 0-.575.136-.845.405M16.75 5.25V4c0-.744-.364-1.425-.845-1.905-.48-.48-1.161-.845-1.905-.845h-4c-.744 0-1.425.364-1.905.845-.48.48-.845 1.161-.845 1.905v1.25H3a.75.75 0 0 0 0 1.5h1.25V20c0 .744.364 1.425.845 1.905.48.48 1.161.845 1.905.845h10c.744 0 1.425-.364 1.905-.845.48-.48.845-1.161.845-1.905V6.75H21a.75.75 0 0 0 0-1.5zM16 6.75H5.75V20c0 .256.136.575.405.845.27.27.589.405.845.405h10c.256 0 .575-.136.845-.405.27-.27.405-.589.405-.845V6.75zm-6 3.5a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75m4 0a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75"
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
