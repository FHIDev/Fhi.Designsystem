import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { queryAssignedElements } from 'lit/decorators.js';
import { FhiTableCell } from '../fhi-table-cell/fhi-table-cell.component';

export const FhiTableRowSelector = 'fhi-table-row';

@customElement(FhiTableRowSelector)
export class FhiTableRow extends LitElement {
  @property({ type: String, reflect: true })
  columns = '1fr';

  @property({ type: String, reflect: true })
  variant: 'header' | 'body' = 'body';

  @queryAssignedElements()
  slotElements!: Array<HTMLElement>;

  connectedCallback(): void {
    super.connectedCallback();

    this.setAttribute('role', 'row');
  }

  protected update(changedProperties: PropertyValues): void {
    if (changedProperties.has('columns')) {
      this.style.gridTemplateColumns = this.columns;
    }

    super.update(changedProperties);
  }

  private handleSlotChange() {
    if (this.variant === 'header') {
      this.slotElements.forEach(element => {
        if (element.tagName.toLowerCase() === 'fhi-table-cell') {
          (element as FhiTableCell).variant = this.variant;
        }
      });
    }
  }

  render() {
    return html`<slot @slotchange=${this.handleSlotChange}></slot>`;
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
