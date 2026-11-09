import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiDataTableCellSelector = 'fhi-data-table-cell';

/**
 * ## FHI Table Cell
 *
 * {@link https://designsystem.fhi.no/?path=/docs/komponenter-data-table--docs}
 *
 * The `<fhi-data-table-cell>` component is an implementation of a table cell according to the FHI Design System guidelines.
 * It allows users to properly display data within a `<fhi-data-table-row>`.
 *
 * @tag fhi-data-table-cell
 * @element fhi-data-table-cell
 *
 * @slot - The content of the table cell, which can be any valid HTML content such as text, images, or other elements.
 */
@customElement(FhiDataTableCellSelector)
export class FhiDataTableCell extends LitElement {
  /**
   * Defines the variant of the table cell, which can be either 'header' or 'body'. This determines the styling and role of the cell within the table.
   * @type {'header' | 'body'}
   */
  @property({ type: String, reflect: true })
  variant: 'header' | 'body' = 'body';

  /**
   * The number of columns the cell should span, similar to the native `colspan` attribute on `<td>` elements.
   * Set it equal to the number of columns in the table to make the cell take up the entire row.
   * @type {number}
   */
  @property({ type: Number, reflect: true, attribute: 'column-span' })
  columnSpan?: number;

  protected update(changedProperties: PropertyValues): void {
    if (changedProperties.has('variant')) {
      this.role = this.variant === 'header' ? 'columnheader' : 'cell';
    }

    if (changedProperties.has('columnSpan')) {
      this.style.gridColumn = this.columnSpan ? `span ${this.columnSpan}` : '';

      if (this.columnSpan && this.columnSpan > 1) {
        this.setAttribute('aria-colspan', String(this.columnSpan));
      } else {
        this.removeAttribute('aria-colspan');
      }
    }

    super.update(changedProperties);
  }

  render() {
    return html`
      <div class="cell-content">
        <slot></slot>
      </div>
    `;
  }

  static styles = css`
    :host {
      --fhi-data-table-cell-justify-content: unset;
      --fhi-data-table-cell-align-items: unset;

      --fhi-data-table-cell-border-style: unset;
      --fhi-data-table-cell-border-width: unset;
      --fhi-data-table-cell-border-color: unset;
    }

    :host {
      --fhi-data-table-cell-justify-content: start;
      --fhi-data-table-cell-align-items: center;

      display: flex;
      flex-direction: column;
      justify-content: center;

      padding: var(--fhi-spacing-150);
      color: var(--fhi-color-neutral-text-default);

      border-style: var(--fhi-data-table-cell-border-style);
      border-width: var(--fhi-data-table-cell-border-width);
      border-color: var(--fhi-data-table-cell-border-color);

      .cell-content {
        display: flex;
        align-items: var(--fhi-data-table-cell-align-items);
        justify-content: var(--fhi-data-table-cell-justify-content);
      }
    }

    :host([variant='body']) {
      letter-spacing: var(--fhi-typography-body-medium-letter-spacing);

      font: var(--fhi-typography-body-medium-font-weight)
        var(--fhi-typography-body-medium-font-size) /
        var(--fhi-typography-body-medium-line-height)
        var(--fhi-font-family-default);
    }

    :host([variant='header']) {
      letter-spacing: var(--fhi-typography-title-medium-letter-spacing);

      font: var(--fhi-typography-title-medium-font-weight)
        var(--fhi-typography-title-medium-font-size) /
        var(--fhi-typography-title-medium-line-height)
        var(--fhi-font-family-default);
    }
  `;
}
