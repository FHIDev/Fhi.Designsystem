import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiCheckboxSelector = 'fhi-checkbox';

@customElement(FhiCheckboxSelector)
export class FhiCheckbox extends LitElement {
  @property({ type: String, reflect: true }) id = '';
  @property({ type: String, reflect: true }) label = '';

  render() {
    return html`
      <div class="checkbox-container">
        <input type="checkbox" id="${this.id}" />
        <label for="${this.id}">${this.label}</label>
      </div>
    `;
  }
  static styles = css`
    :host {
      .checkbox-container {
        display: flex;
        align-items: center;
      }
      label {
        color: var(--fhi-color-neutral-text-default);

        font-family: var(--fhi-font-family-default);
        font-size: var(--fhi-typography-body-medium-font-size);
        font-weight: 400;
        line-height: var(--fhi-typography-body-medium-line-height);
        letter-spacing: var(--fhi-typography-body-medium-letter-spacing);
      }
    }
  `;
}
