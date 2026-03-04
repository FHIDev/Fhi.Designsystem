import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiTableRowSelector = 'fhi-table-row';

@customElement(FhiTableRowSelector)
export class FhiTableRow extends LitElement {
  @property({ type: String, reflect: true, attribute: 'column-span' })
  columnSpan = 'span 1';

  @property({ type: String, reflect: true })
  columns = '1fr';

  @property({ type: String, reflect: true })
  variant: 'header' | 'body' = 'body';

  connectedCallback(): void {
    super.connectedCallback();

    this.setAttribute('role', 'row');
  }

  protected update(changedProperties: PropertyValues): void {
    if (changedProperties.has('columns')) {
      this.style.gridTemplateColumns = this.columns;
    }

    if (changedProperties.has('columnSpan')) {
      this.style.gridColumn = this.columnSpan;
    }

    super.update(changedProperties);
  }

  render() {
    return html`<slot></slot>`;
  }

  static styles = css`
    :host {
      --fhi-table-row-background: initial;

      --fhi-table-row-border-bottom: var(--fhi-dimension-border-width) solid
        var(--fhi-color-neutral-border-subtle);
    }

    :host([variant='header']) {
      --fhi-table-row-border-bottom: var(--fhi-dimension-border-width) solid
        var(--fhi-color-neutral-border-default);
    }

    :host {
      display: grid;
      border-bottom: var(--fhi-table-row-border-bottom);
      background: var(--fhi-table-row-background);
    }
  `;
}
