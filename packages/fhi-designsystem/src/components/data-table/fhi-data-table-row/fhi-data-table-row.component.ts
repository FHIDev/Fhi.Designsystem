import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { queryAssignedElements } from 'lit/decorators.js';
import { FhiDataTableCell } from '../fhi-data-table-cell/fhi-data-table-cell.component';

export const FhiDataTableRowSelector = 'fhi-data-table-row';

/**
 * ## FHI Table Row
 *
 * {@link https://designsystem.fhi.no/?path=/docs/komponenter-data-table-row--docs}
 *
 * The `<fhi-data-table-row>` component is an implementation of a table row according to the FHI Design System guidelines.
 * It allows users to properly display data within a `<fhi-data-table>` using `<fhi-data-table-cell>` components.
 *
 * For various reasons, the `<fhi-data-table-row>` component does not use the native HTML `<tr>` element. Instead, it relies on CSS Grid to achieve the desired layout and styling.
 *
 * @tag fhi-data-table-row
 * @element fhi-data-table-row
 */
@customElement(FhiDataTableRowSelector)
export class FhiDataTableRow extends LitElement {
  /**
   * Defines the variant of the table row, which can be either 'header' or 'body'. This determines the styling and role of the row within the table.
   * If the variant is set to 'header', all child `<fhi-data-table-cell>` elements will also be set to the 'header' variant to ensure consistent styling.
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
      if (element.tagName.toLowerCase() === 'fhi-data-table-cell') {
        const tableCell = element as FhiDataTableCell;

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
      --fhi-data-table-row-border-style: unset;
      --fhi-data-table-row-border-width: unset;
      --fhi-data-table-row-border-color: unset;

      --fhi-data-table-row-background: unset;
    }

    :host {
      display: table-row;
      background: var(--fhi-data-table-row-background);

      --fhi-data-table-row-border-style: none none solid none;
      --fhi-data-table-row-border-width: var(--fhi-dimension-border-width);
      --fhi-data-table-row-border-color: var(
        --fhi-color-neutral-surface-active
      );

      ::slotted(fhi-data-table-cell) {
        --fhi-data-table-cell-background: var(--fhi-data-table-row-background);
        --fhi-data-table-cell-border-style: var(
          --fhi-data-table-row-border-style
        );
        --fhi-data-table-cell-border-width: var(
          --fhi-data-table-row-border-width
        );
        --fhi-data-table-cell-border-color: var(
          --fhi-data-table-row-border-color
        );
      }
    }
  `;
}
