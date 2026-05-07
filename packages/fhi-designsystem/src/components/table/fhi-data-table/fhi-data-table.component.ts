import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../../fhi-grid/fhi-grid.component';
import '../../typography/fhi-body/fhi-body.component';

export const FhiDataTableSelector = 'fhi-data-table';

/**
 * ## FHI Table
 *
 * {@link https://designsystem.fhi.no/?path=/docs/komponenter-data-table--docs}
 *
 * The `<fhi-data-table>` component is an implementation of a table according to the FHI Design System guidelines.
 * It allows users to display tabular data in a structured format using `<fhi-data-table-row>` and `<fhi-data-table-cell>` components.
 *
 * The `<fhi-data-table>` component does not use the native HTML `<table>` element. Instead, it relies on CSS Grid to achieve the desired layout and styling.
 *
 * Example usage:
 * ```html
 * <fhi-data-table caption="Example Table" columns="2fr 1fr 1fr">
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

  connectedCallback(): void {
    super.connectedCallback();

    this.role = 'table';
  }

  protected update(changedProperties: PropertyValues): void {
    super.update(changedProperties);
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

  render() {
    return html`
      <div class="table-content">
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
      --fhi-data-table-caption-width: unset;

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
        width: var(--fhi-data-table-caption-width);
      }

      .table-content {
        display: table;
        width: 100%;
        overflow: hidden;
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
