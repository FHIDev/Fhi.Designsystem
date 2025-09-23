import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiGridSelector = 'fhi-grid';
type FhiUnitType = 'px' | 'rem';
type FhiGapWidthUnit = `${number}${FhiUnitType}` | number;

@customElement(FhiGridSelector)
export class FhiGrid extends LitElement {
  @property({ type: String }) gap:
    | 'small'
    | 'medium'
    | 'large'
    | FhiGapWidthUnit = 'medium';
  @property({ type: Number }) rows?: number;
  @property({ type: Number }) columns = 12;

  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    if (changedProperties.has('rows')) {
      this.style.gridTemplateRows = `repeat( ${this.rows}, 1fr )`;
    }

    if (changedProperties.has('columns')) {
      this.style.gridTemplateColumns = `repeat( ${this.columns}, 1fr )`;
    }

    if (changedProperties.has('gap')) {
      const isPresetGap = ['small', 'medium', 'large'].includes(
        String(this.gap),
      );

      if (isPresetGap) {
        this.style.gap = '';
        return;
      }
      const gapValue = Number(this.gap) ? `${this.gap}px` : this.gap;
      this.style.gap = gapValue as string;
    }
  }

  render() {
    return html`<slot></slot>`;
  }

  static styles = css`
    :host {
      --dimension-grid-gap-small: var(--fhi-spacing-100);
      --dimension-grid-gap-medium: var(--fhi-spacing-200);
      --dimension-grid-gap-large: var(--fhi-spacing-300);
    }
    :host {
      display: grid;
      gap: var(--dimension-grid-gap-medium);
    }
    :host([gap='small']) {
      gap: var(--dimension-grid-gap-small);
    }

    :host([gap='medium']) {
      gap: var(--dimension-grid-gap-medium);
    }

    :host([gap='large']) {
      gap: var(--dimension-grid-gap-large);
    }
  `;
}
