import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../../fhi-grid/fhi-grid.component';
import '../../typography/fhi-body/fhi-body.component';

export const FhiTableSelector = 'fhi-table';

/**
 * ## FHI Table
 *
 * {@link https://designsystem.fhi.no/?path=/docs/komponenter-table--docs}
 *
 * The `<fhi-table>` component is an implementation of a table according to the FHI Design System guidelines.
 * It allows users to display tabular data in a structured format using `<fhi-table-row>` and `<fhi-table-cell>` components.
 *
 * The `<fhi-table>` component does not use the native HTML `<table>` element. Instead, it relies on CSS Grid to achieve the desired layout and styling.
 *
 * Example usage:
 * ```html
 * <fhi-table caption="Example Table" columns="2fr 1fr 1fr">
 *   <fhi-table-row variant="header">
 *     <fhi-table-cell>Header 1</fhi-table-cell>
 *     <fhi-table-cell>Header 2</fhi-table-cell>
 *     <fhi-table-cell>Header 3</fhi-table-cell>
 *   </fhi-table-row>
 *  <fhi-table-row>
 *    <fhi-table-cell>Data 1</fhi-table-cell>
 *    <fhi-table-cell>Data 2</fhi-table-cell>
 *    <fhi-table-cell>Data 3</fhi-table-cell>
 *  </fhi-table-row>
 * </fhi-table>
 * ```
 *
 * @tag fhi-table
 * @element fhi-table
 */
@customElement(FhiTableSelector)
export class FhiTable extends LitElement {
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
      --fhi-table-caption-width: unset;

      --fhi-table-border-style: unset;
      --fhi-table-border-width: unset;
      --fhi-table-border-color: unset;
      --fhi-table-border-radius: unset;
    }

    :host {
      --fhi-table-border-style: solid;
      --fhi-table-border-width: var(--fhi-dimension-border-width);
      --fhi-table-border-color: var(--fhi-color-neutral-surface-active);
      --fhi-table-border-radius: var(--fhi-border-radius-100);

      color: var(--fhi-color-neutral-text-default);

      .caption {
        display: block;
        padding: var(--fhi-spacing-150);
        width: var(--fhi-table-caption-width);
      }

      .table-content {
        display: table;
        width: 100%;
        overflow: hidden;
        border-style: var(--fhi-table-border-style);
        border-width: var(--fhi-table-border-width);
        border-color: var(--fhi-table-border-color);
        border-radius: var(--fhi-table-border-radius);
      }

      ::slotted(fhi-table-row:last-child) {
        --fhi-table-row-border-style: none none none none;
        --fhi-table-row-border-width: unset;
        --fhi-table-row-border-color: unset;
      }
    }

    :host([striped]) {
      ::slotted(fhi-table-row:nth-child(even)) {
        --fhi-table-row-background: var(--fhi-color-neutral-background-subtle);
      }

      ::slotted(fhi-table-row:nth-child(odd)) {
        --fhi-table-row-background: var(--fhi-color-neutral-background-default);
      }
    }
  `;
}
