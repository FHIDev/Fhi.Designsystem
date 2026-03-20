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
    this.role = 'table';
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
      --fhi-table-width: unset;
    }

    :host {
      --fhi-table-width: max-content;

      display: block;
      width: var(--fhi-table-width);
      color: var(--fhi-color-neutral-text-default);

      #caption {
        display: block;
        padding: 1rem;
        color: var(--fhi-color-neutral-text-default);
      }
    }

    :host([zebra]) {
      ::slotted(fhi-table-row:nth-child(even)) {
        --fhi-table-row-background: var(--fhi-color-neutral-background-subtle);
      }
    }
  `;
}
