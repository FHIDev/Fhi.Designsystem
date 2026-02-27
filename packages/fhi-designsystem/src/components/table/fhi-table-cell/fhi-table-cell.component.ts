import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiTableCellSelector = 'fhi-table-cell';

@customElement(FhiTableCellSelector)
export class FhiTableCell extends LitElement {
  @property({ type: String, attribute: 'row-span' })
  rowSpan = 'span 1';

  @property({ type: String, attribute: 'col-span' })
  colSpan = 'span 1';

  protected update(changedProperties: PropertyValues): void {
    super.update(changedProperties);

    this.style.gridRow = this.rowSpan;
    this.style.gridColumn = this.colSpan;
  }

  render() {
    return html` <slot></slot> `;
  }

  static styles = css`
    :host {
      display: block;
    }
  `;
}
