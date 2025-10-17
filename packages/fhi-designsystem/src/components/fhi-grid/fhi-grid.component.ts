import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiGridSelector = 'fhi-grid';
type FhiUnitType = 'px' | 'rem';
type FhiGapWidthUnit = `${number}${FhiUnitType}` | number;

/**
 * ## FHI Grid
 *
 * A layout component for creating grid layouts. It is a wrapper around the CSS Grid Layout module.
 *
 * {@link https://designsystem.fhi.no/?path=/docs/komponenter-grid--docs}
 *
 * @tag fhi-grid
 * @element fhi-grid
 *
 */
@customElement(FhiGridSelector)
export class FhiGrid extends LitElement {
  /**
   * Sets the gap between grid items. Can be a preset value ('small', 'medium', 'large') or a custom CSS value (e.g., '20px', '1.5rem').
   * @attr
   * @type {'small' | 'medium' | 'large' | number | string}
   */
  @property({ type: String }) gap:
    | 'small'
    | 'medium'
    | 'large'
    | FhiGapWidthUnit = 'medium';

  /**
   * Sets the number of columns in the grid.
   * @attr
   * @type {number}
   */
  @property({ type: Number }) columns = 12;

  /** @internal */
  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    if (changedProperties.has('columns')) {
      this.style.gridTemplateColumns = `repeat( ${this.columns}, 1fr )`;
    }

    if (changedProperties.has('gap')) {
      switch (this.gap) {
        case 'large':
        case 'medium':
        case 'small':
          this.style.gap = '';
          return;
        default:
          const gapValue = Number(this.gap) ? `${this.gap}px` : this.gap;
          this.style.gap = gapValue as string;
          return;
      }
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
