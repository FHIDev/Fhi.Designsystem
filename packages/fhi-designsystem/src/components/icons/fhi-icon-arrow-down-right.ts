import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiIconArrowDownRightSelector = 'fhi-icon-arrow-down-right';

@customElement(FhiIconArrowDownRightSelector)
export class FhiIconArrowDownRight extends LitElement {
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
          d="M6.47 6.47a.75.75 0 0 1 1.06 0l8.72 8.72V7a.75.75 0 0 1 1.5 0v10a.75.75 0 0 1-.75.75H7a.75.75 0 0 1 0-1.5h8.19L6.47 7.53a.75.75 0 0 1 0-1.06"
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
