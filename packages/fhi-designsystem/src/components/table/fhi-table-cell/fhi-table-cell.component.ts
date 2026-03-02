import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiTableCellSelector = 'fhi-table-cell';

@customElement(FhiTableCellSelector)
export class FhiTableCell extends LitElement {
  @property({ type: String })
  row = 'span 1';

  @property({ type: String })
  column = 'span 1';

  @property({ type: String })
  variant: 'header' | 'body' = 'body';

  protected update(changedProperties: PropertyValues): void {
    this.style.gridRow = this.row;
    this.style.gridColumn = this.column;

    if (changedProperties.has('variant')) {
      if (this.variant != 'header' && this.variant != 'body') {
        this.variant = 'body';
      }
    }

    super.update(changedProperties);
  }

  render() {
    return html`<div
      role="${this.variant === 'header' ? 'columnheader' : 'cell'}"
    >
      <slot></slot>
    </div>`;
  }

  static styles = css`
    :host {
      --justify-content: start;
      --align-items: center;
    }

    :host {
      div {
        display: flex;
        justify-content: var(--justify-content);
        align-items: var(--align-items);
        padding: 1rem;
        height: -webkit-fill-available;
      }

      div[role='cell'] {
        border-bottom: 1px solid var(--fhi-color-neutral-border-subtle);
      }

      div[role='columnheader'] {
        border-bottom: 1px solid var(--fhi-color-neutral-border-default);
      }
    }
  `;
}
