import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiIconLogInSelector = 'fhi-icon-log-in';

@customElement(FhiIconLogInSelector)
export class FhiIconLogIn extends LitElement {
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
          d="M14.25 3a.75.75 0 0 1 .75-.75h4A2.75 2.75 0 0 1 21.75 5v14A2.75 2.75 0 0 1 19 21.75h-4a.75.75 0 0 1 0-1.5h4A1.25 1.25 0 0 0 20.25 19V5A1.25 1.25 0 0 0 19 3.75h-4a.75.75 0 0 1-.75-.75M9.47 6.47a.75.75 0 0 1 1.06 0l5 5a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 1 1-1.06-1.06l3.72-3.72H3a.75.75 0 0 1 0-1.5h10.19L9.47 7.53a.75.75 0 0 1 0-1.06"
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
