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

  /**
   * Defines the column structure of the table using CSS Grid syntax. This should be a string that specifies the width of each column, such as '1fr 2fr 1fr' for three columns with different widths.
   * All `<fhi-table-row>` elements within the table will inherit this column structure.
   * The number of columns defined here should match the number of `<fhi-table-cell>` elements within a `<fhi-table-row>` for proper alignment.
   * @type {string}
   */
  @property({ type: String, reflect: true })
  columns: string = '1fr';

  connectedCallback(): void {
    super.connectedCallback();

    this.role = 'table';
  }

  protected update(changedProperties: PropertyValues): void {
    if (!this.columns) {
      this.columns = '1fr';
    }

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

    if (changedProperties.has('columns')) {
      this.style.setProperty('--fhi-table-grid-template-columns', this.columns);
    }
  }

  render() {
    return html`
      <slot></slot>
      ${this.caption
        ? html`<fhi-body class="caption" size="small"
            >${this.caption}</fhi-body
          >`
        : null}
    `;
  }

  static styles = css`
    :host {
      --fhi-table-width: unset;

      --fhi-table-caption-width: unset;

      --fhi-table-grid-template-columns: unset;

      --fhi-table-border-style: unset;
      --fhi-table-border-width: unset;
      --fhi-table-border-color: unset;
      --fhi-table-border-radius: unset;
    }

    :host {
      --fhi-table-width: max-content;

      --fhi-table-border-style: solid;
      --fhi-table-border-width: var(--fhi-dimension-border-width);
      --fhi-table-border-color: var(--fhi-color-neutral-surface-active);
      --fhi-table-border-radius: var(--fhi-border-radius-100);

      display: block;
      color: var(--fhi-color-neutral-text-default);

      slot {
        display: block;
        width: var(--fhi-table-width);
        border-style: var(--fhi-table-border-style);
        border-width: var(--fhi-table-border-width);
        border-color: var(--fhi-table-border-color);
        border-radius: var(--fhi-table-border-radius);
      }

      .caption {
        display: block;
        padding: var(--fhi-spacing-150);
        width: var(--fhi-table-caption-width);
      }

      ::slotted(fhi-table-row) {
        --fhi-table-row-grid-template-columns: var(
          --fhi-table-grid-template-columns
        );
      }

      ::slotted(fhi-table-row:first-child) {
        --fhi-table-row-border-radius: var(--fhi-table-border-radius)
          var(--fhi-table-border-radius) 0 0;
      }

      ::slotted(fhi-table-row:last-child) {
        --fhi-table-row-border-style: none none none none;
        --fhi-table-row-border-width: unset;
        --fhi-table-row-border-color: unset;
        --fhi-table-row-border-radius: 0 0 var(--fhi-table-border-radius)
          var(--fhi-table-border-radius);
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
