import { html, css, LitElement, PropertyValues } from 'lit';
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

  protected update(changedProperties: PropertyValues): void {
    if (changedProperties.has('rows')) {
      if (!this.rows) {
        this.rows = '1';
      }
    }

    if (changedProperties.has('columns')) {
      if (!this.columns) {
        this.columns = '1';
      }
    }

    super.update(changedProperties);
  }

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
