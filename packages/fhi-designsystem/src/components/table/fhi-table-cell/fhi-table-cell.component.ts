import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiTableCellSelector = 'fhi-table-cell';

@customElement(FhiTableCellSelector)
export class FhiTableCell extends LitElement {
  @property({ type: String })
  row = 'span 1';

  @property({ type: String })
  column = 'span 1';

  @property({ type: String, reflect: true })
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
      --padding: var(--fhi-spacing-200);
      --height: -webkit-fill-available;

      --color: var(--fhi-color-neutral-text-default);
      --letter-spacing: var(--letter-spacing-medium);

      --border-bottom: var(--fhi-dimension-border-width) solid
        var(--fhi-color-neutral-border-subtle);

      --font: var(--fhi-typography-body-medium-font-weight)
        var(--fhi-typography-body-medium-font-size) /
        var(--fhi-typography-body-medium-line-height)
        var(--fhi-font-family-default);
    }

    :host([variant='header']) {
      --border-bottom: var(--fhi-dimension-border-width) solid
        var(--fhi-color-neutral-border-default);

      --font: var(--fhi-typography-label-medium-font-weight)
        var(--fhi-typography-label-medium-font-size) /
        var(--fhi-typography-label-medium-line-height)
        var(--fhi-font-family-default);
    }

    :host {
      div {
        display: flex;
        justify-content: var(--justify-content);
        align-items: var(--align-items);
        padding: var(--padding);
        height: var(--height);
        border-bottom: var(--border-bottom);

        font: var(--font);
        color: var(--color);
        letter-spacing: var(--letter-spacing);
      }

      div[role='columnheader'] {
        border-bottom: var(--border-bottom);
      }
    }
  `;
}
