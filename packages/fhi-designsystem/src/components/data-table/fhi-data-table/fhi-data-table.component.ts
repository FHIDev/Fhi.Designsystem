import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import '../../fhi-grid/fhi-grid.component';
import '../../typography/fhi-body/fhi-body.component';

import type { FhiDataTableCell } from '../fhi-data-table-cell/fhi-data-table-cell.component';

export const FhiDataTableSelector = 'fhi-data-table';

/**
 * ## FHI Table
 *
 * {@link https://designsystem.fhi.no/?path=/docs/komponenter-data-table--docs}
 *
 * The `<fhi-data-table>` component is an implementation of a table according to the FHI Design System guidelines.
 * It allows users to display tabular data in a structured format using `<fhi-data-table-row>` and `<fhi-data-table-cell>` components.
 *
 * Example usage:
 * ```html
 * <fhi-data-table caption="Example Table">
 *   <fhi-data-table-row variant="header">
 *     <fhi-data-table-cell>Header 1</fhi-data-table-cell>
 *     <fhi-data-table-cell>Header 2</fhi-data-table-cell>
 *     <fhi-data-table-cell>Header 3</fhi-data-table-cell>
 *   </fhi-data-table-row>
 *  <fhi-data-table-row>
 *    <fhi-data-table-cell>Data 1</fhi-data-table-cell>
 *    <fhi-data-table-cell>Data 2</fhi-data-table-cell>
 *    <fhi-data-table-cell>Data 3</fhi-data-table-cell>
 *  </fhi-data-table-row>
 * </fhi-data-table>
 * ```
 *
 * @tag fhi-data-table
 * @element fhi-data-table
 *
 * @slot - The content of the table, consisting of `<fhi-data-table-row>` elements which in turn contain `<fhi-data-table-cell>` elements.
 *
 */
@customElement(FhiDataTableSelector)
export class FhiDataTable extends LitElement {
  /**
   * The caption of the table. This should provide a brief description of the table's content.
   * @type {string}
   */
  @property({ type: String, reflect: true })
  caption?: string;

  /**
   * If set to true, the table will have alternating row colors (striped effect) for better readability.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true })
  striped?: boolean;

  @state()
  private _numberOfColumns = 1;

  private _mutationObserver = new MutationObserver(() =>
    this._updateColumnCount(),
  );

  connectedCallback(): void {
    super.connectedCallback();

    this.role = 'table';

    this._mutationObserver.observe(this, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['column-span'],
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this._mutationObserver.disconnect();
  }

  protected willUpdate(changedProperties: PropertyValues): void {
    this._updateColumnCount();

    super.willUpdate(changedProperties);
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('caption')) {
      if (this.caption) {
        this.setAttribute('aria-label', this.caption);
      } else {
        this.removeAttribute('aria-label');
      }
    }
  }

  private _updateColumnCount(): void {
    const rows = this.querySelectorAll(':scope > fhi-data-table-row');

    this._numberOfColumns = Array.from(rows).reduce((highestRowSpan, row) => {
      const cells = row.querySelectorAll<FhiDataTableCell>(
        'fhi-data-table-cell',
      );

      const rowSpan = Array.from(cells).reduce(
        (sum, cell) => sum + (cell.columnSpan || 1),
        0,
      );

      return Math.max(highestRowSpan, rowSpan);
    }, 1);
  }

  render() {
    return html`
      <div
        class="table-content"
        style="grid-template-columns: repeat(${this._numberOfColumns}, auto);"
      >
        <slot></slot>
      </div>
      ${this.caption
        ? html`<fhi-body class="caption" size="small"
            >${this.caption}</fhi-body
          >`
        : null}
    `;
  }

  static styles = css`
    :host {
      --fhi-data-table-border-color: unset;
      --fhi-data-table-border-radius: unset;

      --fhi-data-table-background: unset;
    }

    :host {
      --fhi-data-table-border-color: var(--fhi-color-neutral-surface-active);
      --fhi-data-table-border-radius: var(--fhi-border-radius-100);

      color: var(--fhi-color-neutral-text-default);

      .caption {
        display: block;
        padding: var(--fhi-spacing-150);
      }

      .table-content {
        display: grid;
        width: 100%;
        overflow: scroll;
        border: var(--fhi-dimension-border-width) solid
          var(--fhi-data-table-border-color);
        border-radius: var(--fhi-data-table-border-radius);
        background: var(--fhi-data-table-background);
      }

      ::slotted(fhi-data-table-row:last-child) {
        --fhi-data-table-row-border-style: none none none none;
        --fhi-data-table-row-border-width: unset;
        --fhi-data-table-row-border-color: unset;
      }
    }

    :host([striped]) {
      ::slotted(fhi-data-table-row:nth-child(even)) {
        --fhi-data-table-row-background: var(
          --fhi-color-neutral-background-subtle
        );
      }

      ::slotted(fhi-data-table-row:nth-child(odd)) {
        --fhi-data-table-row-background: var(
          --fhi-color-neutral-background-default
        );
      }
    }
  `;
}
