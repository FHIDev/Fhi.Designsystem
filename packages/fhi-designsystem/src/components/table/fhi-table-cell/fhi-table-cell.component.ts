import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiTableCellSelector = 'fhi-table-cell';

@customElement(FhiTableCellSelector)
export class FhiTableCell extends LitElement {
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
