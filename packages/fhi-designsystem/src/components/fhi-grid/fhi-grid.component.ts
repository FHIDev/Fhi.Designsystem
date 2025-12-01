import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiGridSelector = 'fhi-grid';
type FhiUnitType = 'px' | 'rem';
type FhiGapWidthUnit = `${number}${FhiUnitType}` | number;

/**
 * ## FHI Grid
 *
 * {@link https://designsystem.fhi.no/?path=/docs/komponenter-grid--docs}
 *
 * The `<fhi-grid>` component is a grid container that uses CSS Grid Layout to organize its child elements into a structured grid format.
 * It allows for easy control over the number of columns and the spacing between grid items.
 *
 * @tag fhi-grid
 * @element fhi-grid
 *
 */
@customElement(FhiGridSelector)
export class FhiGrid extends LitElement {
  /**
   * Sets the gap between items within the grid container. It can be one of the preset values, a rem or px value, or a number.
   * If you give a number, it will be treated as pixels.
   * @type {'small' | 'medium' | 'large' | number | string}
   */
  @property({ type: String }) gap:
    | 'small'
    | 'medium'
    | 'large'
    | FhiGapWidthUnit = 'medium';

  /**
   * Sets the number of columns in the grid layout.
   * @type {number}
   */
  @property({ type: Number }) columns = 12;

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
