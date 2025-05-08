import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiIconQuestionSelector = 'fhi-icon-question';

@customElement(FhiIconQuestionSelector)
export class FhiIconQuestion extends LitElement {
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
          d="M11.464 5.803a2.75 2.75 0 0 1 1.988 5.032c-.491.306-1.026.704-1.444 1.202-.422.5-.758 1.143-.758 1.91V14a.75.75 0 0 0 1.5 0v-.053c0-.306.131-.618.406-.944.277-.33.666-.632 1.088-.894A4.25 4.25 0 1 0 7.894 7.4a.75.75 0 0 0 1.45.388 2.75 2.75 0 0 1 2.12-1.985M12 17a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2z"
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
