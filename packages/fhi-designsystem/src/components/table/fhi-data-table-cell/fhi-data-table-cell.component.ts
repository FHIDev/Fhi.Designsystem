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
 * The `<fhi-table-cell>` component does not use the native HTML `<td>` or `<th>` elements. Instead, it relies on CSS Grid to achieve the desired layout and styling.
 *
 * @tag fhi-data-table-cell
 * @element fhi-data-table-cell
 */
@customElement(FhiDataTableCellSelector)
export class FhiDataTableCell extends LitElement {
  /**
   * Defines the variant of the table cell, which can be either 'header' or 'body'. This determines the styling and role of the cell within the table.
   * @type {'header' | 'body'}
   */
  @property({ type: String, reflect: true })
  variant: 'header' | 'body' = 'body';

  protected update(changedProperties: PropertyValues): void {
    if (changedProperties.has('variant')) {
      this.role = this.variant === 'header' ? 'columnheader' : 'cell';
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

      display: table-cell;
      vertical-align: middle;

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
      white-space: nowrap;

      letter-spacing: var(--fhi-typography-label-medium-letter-spacing);

      font: var(--fhi-typography-label-medium-font-weight)
        var(--fhi-typography-label-medium-font-size) /
        var(--fhi-typography-label-medium-line-height)
        var(--fhi-font-family-default);
    }
  `;
}
