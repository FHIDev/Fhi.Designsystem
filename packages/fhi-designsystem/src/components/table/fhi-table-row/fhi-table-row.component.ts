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
 * For various reasons, the `<fhi-table-row>` component does not use the native HTML `<tr>` element. Instead, it relies on CSS Grid to achieve the desired layout and styling.
 *
 * @tag fhi-table-row
 * @element fhi-table-row
 */
@customElement(FhiTableRowSelector)
export class FhiTableRow extends LitElement {
  /**
   * Defines the column structure of the table row using CSS Grid syntax. This should be a string that specifies the width of each column, such as '1fr 2fr 1fr' for three columns with different widths.
   * The number of columns defined here should match the number of `<fhi-table-cell>` elements within the row for proper alignment.
   * @type {string}
   */
  @property({ type: String, reflect: true })
  columns = '1fr';

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

    this.setAttribute('role', 'row');
  }

  protected update(changedProperties: PropertyValues): void {
    if (changedProperties.has('columns')) {
      this.style.gridTemplateColumns = this.columns;
    }

    super.update(changedProperties);
  }

  private handleSlotChange() {
    if (this.variant === 'header') {
      this.slotElements.forEach(element => {
        if (element.tagName.toLowerCase() === 'fhi-table-cell') {
          (element as FhiTableCell).variant = this.variant;
        }
      });
    }
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
      --fhi-table-row-border-style: none none solid none;
      --fhi-table-row-border-width: var(--fhi-dimension-border-width);
      --fhi-table-row-border-color: var(--fhi-color-neutral-surface-active);

      display: grid;
      border-style: var(--fhi-table-row-border-style);
      border-width: var(--fhi-table-row-border-width);
      border-color: var(--fhi-table-row-border-color);
      background: var(--fhi-table-row-background);
    }
  `;
}
