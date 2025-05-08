import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiIconPaperclipSelector = 'fhi-icon-paperclip';

@customElement(FhiIconPaperclipSelector)
export class FhiIconPaperclip extends LitElement {
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
          d="M20.561 6.268c.076 1.287-.387 2.618-1.53 3.762l-8.5 8.5c-.645.644-1.413.92-2.169.875-.737-.043-1.404-.387-1.892-.875s-.832-1.155-.875-1.892c-.044-.756.23-1.524.875-2.168l8.5-8.5a.75.75 0 1 1 1.06 1.06l-8.5 8.5c-.356.356-.456.713-.438 1.02.02.325.176.658.438.92s.595.418.92.438c.307.018.664-.082 1.02-.438l8.5-8.5c.856-.856 1.143-1.775 1.094-2.613-.05-.857-.457-1.69-1.094-2.327s-1.47-1.043-2.326-1.094c-.839-.05-1.758.238-2.614 1.094l-.53-.53.53.53-8.5 8.5c-1.356 1.356-1.83 2.838-1.75 4.207.082 1.388.738 2.72 1.75 3.733s2.345 1.668 3.733 1.75c1.37.08 2.85-.394 4.207-1.75l9.5-9.5a.75.75 0 1 1 1.06 1.06l-9.5 9.5c-1.644 1.644-3.537 2.294-5.355 2.188-1.8-.106-3.467-.95-4.705-2.188s-2.082-2.905-2.187-4.705c-.107-1.818.543-3.711 2.187-5.355L4 12l-.53-.53 8.5-8.5c1.144-1.144 2.475-1.607 3.762-1.531 1.268.074 2.435.668 3.298 1.53.863.864 1.457 2.031 1.531 3.3"
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
