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
 * For various reasons, the `<fhi-table>` component does not use the native HTML `<table>` element. Instead, it relies on CSS Grid to achieve the desired layout and styling.
 *
 * Example usage:
 * ```html
 * <fhi-table caption="Example Table">
 *   <fhi-table-row variant="header" columns="2fr 1fr 1fr">
 *     <fhi-table-cell variant="header">Header 1</fhi-table-cell>
 *     <fhi-table-cell variant="header">Header 2</fhi-table-cell>
 *     <fhi-table-cell variant="header">Header 3</fhi-table-cell>
 *   </fhi-table-row>
 *  <fhi-table-row columns="2fr 1fr 1fr">
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
    }

    :host {
      --fhi-table-width: max-content;

      display: block;
      width: var(--fhi-table-width);
      color: var(--fhi-color-neutral-text-default);

      slot {
        display: block;
        border: 1px solid var(--fhi-color-neutral-surface-active);
        border-radius: var(--fhi-border-radius-100);
      }

      .caption {
        display: block;
        padding: 1rem;
        color: var(--fhi-color-neutral-text-default);
      }
    }

    :host([striped]) {
      ::slotted(fhi-table-row:nth-child(even)) {
        --fhi-table-row-background: var(--fhi-color-neutral-background-subtle);
      }
    }
  `;
}
