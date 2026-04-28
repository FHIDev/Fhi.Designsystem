import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { queryAssignedElements } from 'lit/decorators.js';
import { FhiTableCell } from '../fhi-table-cell/fhi-table-cell.component';

export const FhiTableRowSelector = 'fhi-table-row';

/**
 * ## FHI Table Row
 *
 * {@link https://designsystem.fhi.no/?path=/docs/komponenter-table-row--docs}
 *
 * The `<fhi-table-row>` component is an implementation of a table row according to the FHI Design System guidelines.
 * It allows users to properly display data within a `<fhi-table>` using `<fhi-table-cell>` components.
 *
 * The `<fhi-table-row>` component does not use the native HTML `<tr>` element. Instead, it relies on CSS Grid to achieve the desired layout and styling.
 *
 * @tag fhi-table-row
 * @element fhi-table-row
 */
@customElement(FhiTableRowSelector)
export class FhiTableRow extends LitElement {
  /**
   * Defines the variant of the table row, which can be either 'header' or 'body'. This determines the styling and role of the row within the table.
   * If the variant is set to 'header', all child `<fhi-table-cell>` elements will also be set to the 'header' variant to ensure consistent styling.
   * @type {'header' | 'body'}
   */
  @property({ type: String, reflect: true })
  variant: 'header' | 'body' = 'body';

  @queryAssignedElements()
  slotElements!: Array<HTMLElement>;

  connectedCallback(): void {
    super.connectedCallback();
    this.role = 'row';
  }

  protected update(changedProperties: PropertyValues): void {
    if (changedProperties.has('variant')) {
      if (this.variant !== 'body' && this.variant !== 'header') {
        this.variant = 'body';
      }
    }

    super.update(changedProperties);
  }

  protected updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('variant')) {
      this.setCellVariants();
    }

    super.updated(changedProperties);
  }

  private handleSlotChange() {
    this.setCellVariants();
  }

  private setCellVariants() {
    this.slotElements.forEach(element => {
      if (element.tagName.toLowerCase() === 'fhi-table-cell') {
        const tableCell = element as FhiTableCell;

        if (tableCell.variant !== this.variant) {
          tableCell.variant = this.variant;
        }
      }
    });
  }

  render() {
    return html`<slot @slotchange=${this.handleSlotChange}></slot>`;
  }

  static styles = css`
    :host {
      --fhi-table-row-border-style: unset;
      --fhi-table-row-border-width: unset;
      --fhi-table-row-border-color: unset;

      --fhi-table-row-background: unset;
    }

    :host {
      display: table-row;
      background: var(--fhi-table-row-background);

      --fhi-table-row-border-style: none none solid none;
      --fhi-table-row-border-width: var(--fhi-dimension-border-width);
      --fhi-table-row-border-color: var(--fhi-color-neutral-surface-active);

      ::slotted(fhi-table-cell) {
        --fhi-table-cell-background: var(--fhi-table-row-background);
        --fhi-table-cell-border-style: var(--fhi-table-row-border-style);
        --fhi-table-cell-border-width: var(--fhi-table-row-border-width);
        --fhi-table-cell-border-color: var(--fhi-table-row-border-color);
      }
    }
  `;
}
