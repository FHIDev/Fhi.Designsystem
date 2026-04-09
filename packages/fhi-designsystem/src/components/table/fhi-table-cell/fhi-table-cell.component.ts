import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiTableCellSelector = 'fhi-table-cell';

/**
 * ## FHI Table Cell
 *
 * {@link https://designsystem.fhi.no/?path=/docs/komponenter-table--docs}
 *
 * The `<fhi-table-cell>` component is an implementation of a table cell according to the FHI Design System guidelines.
 * It allows users to properly display data within a `<fhi-table-row>`.
 *
 * For various reasons, the `<fhi-table-cell>` component does not use the native HTML `<td>` or `<th>` elements. Instead, it relies on CSS Grid to achieve the desired layout and styling.
 *
 * @tag fhi-table-cell
 * @element fhi-table-cell
 */
@customElement(FhiTableCellSelector)
export class FhiTableCell extends LitElement {
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
    return html`<slot></slot>`;
  }

  static styles = css`
    :host {
      --fhi-table-cell-justify-content: unset;
      --fhi-table-cell-align-items: unset;
    }

    :host {
      --fhi-table-cell-justify-content: start;
      --fhi-table-cell-align-items: center;

      display: flex;
      justify-content: var(--fhi-table-cell-justify-content);
      align-items: var(--fhi-table-cell-align-items);
      padding: var(--fhi-spacing-150);
      height: -webkit-fill-available;
      min-width: min-content;
      overflow: hidden;
      flex-wrap: wrap;
      background: initial;
    }

    :host([variant='body']) {
      letter-spacing: var(--fhi-typography-body-medium-letter-spacing);

      font: var(--fhi-typography-body-medium-font-weight)
        var(--fhi-typography-body-medium-font-size) /
        var(--fhi-typography-body-medium-line-height)
        var(--fhi-font-family-default);
    }

    :host([variant='header']) {
      letter-spacing: var(--fhi-typography-label-medium-letter-spacing);

      font: var(--fhi-typography-label-medium-font-weight)
        var(--fhi-typography-label-medium-font-size) /
        var(--fhi-typography-label-medium-line-height)
        var(--fhi-font-family-default);
    }
  `;
}
