import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../../fhi-grid/fhi-grid.component';
import '../../typography/fhi-body/fhi-body.component';

export const FhiTableSelector = 'fhi-table';

@customElement(FhiTableSelector)
export class FhiTable extends LitElement {
  @property({ type: String, reflect: true })
  caption?: string;

  connectedCallback(): void {
    super.connectedCallback();

    this.setAttribute('role', 'table');
  }

  protected update(changedProperties: PropertyValues): void {
    if (this.caption) {
      this.setAttribute('aria-label', this.caption);
    }

    super.update(changedProperties);
  }

  render() {
    return html`
      <slot></slot>
      ${this.caption
        ? html`<fhi-body id="caption" size="small">${this.caption}</fhi-body>`
        : null}
    `;
  }

  static styles = css`
    :host {
      --fhi-table-width: auto;
    }

    :host {
      display: block;
      width: var(--fhi-table-width);
      #caption {
        display: block;
        padding: 1rem;
      }
    }
  `;
}
