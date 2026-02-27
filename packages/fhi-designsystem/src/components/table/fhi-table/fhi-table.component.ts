import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../../fhi-grid/fhi-grid.component';

export const FhiTableSelector = 'fhi-table';

@customElement(FhiTableSelector)
export class FhiTable extends LitElement {
  @property({ type: Number })
  rows = 0;

  @property({ type: Number })
  colums = 0;

  render() {
    return html`
      <fhi-grid gap="small" rows="${this.rows}" colums="${this.colums}">
        <slot></slot>
      </fhi-grid>
    `;
  }

  static styles = css`
    :host {
    }
  `;
}
