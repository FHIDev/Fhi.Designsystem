import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

export const FhiTableSelector = 'fhi-table';

@customElement(FhiTableSelector)
export class FhiTable extends LitElement {
  render() {
    return html`
      <div>
        <slot name="header"></slot>
        <slot name="body"></slot>
        <slot name="footer"></slot>
      </div>
    `;
  }

  static styles = css``;
}
