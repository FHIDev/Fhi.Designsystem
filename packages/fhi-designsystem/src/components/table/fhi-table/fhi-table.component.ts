import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../../fhi-grid/fhi-grid.component';
import '../../typography/fhi-body/fhi-body.component';

import { ifDefined } from 'lit/directives/if-defined.js';

export const FhiTableSelector = 'fhi-table';

@customElement(FhiTableSelector)
export class FhiTable extends LitElement {
  @property({ type: String })
  rows = '1';

  @property({ type: String })
  columns = '1';

  @property({ type: String, reflect: true })
  caption?: string;

  render() {
    return html`
      <div
        role="table"
        style="grid-template-columns: ${this
          .columns}; grid-template-rows: ${this.rows};"
        aria-labelledby="${ifDefined(this.caption ? 'caption' : undefined)}"
      >
        <slot></slot>
      </div>
      ${this.caption
        ? html`<fhi-body id="caption" size="small">${this.caption}</fhi-body>`
        : null}
    `;
  }

  static styles = css`
    :host {
      #caption {
        display: block;
        padding: 1rem;
      }

      div[role='table'] {
        display: grid;
      }
    }
  `;
}
