import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiGridSelector = 'fhi-grid';
type FhiUnitType = 'px' | 'rem';
type FhiGapWidthUnit = `${number}${FhiUnitType}` | number;

@customElement(FhiGridSelector)
export class FhiGrid extends LitElement {
  @property({ type: String, reflect: true }) gap:
    | 'small'
    | 'medium'
    | 'large'
    | FhiGapWidthUnit = 'medium';
  render() {
    return html`<slot></slot>`;
  }

  static styles = css`
    :host {
      --dimension-grid-gap-small: var(--fhi-spacing-100);
      --dimesnion-grid-gap-medium: var(--fhi-spacing-200);
      --dimension-grid-gap-large: var(--fhi-spacing-300);
    }
    :host {
      display: grid;
      gap: var(--dimesnion-grid-gap-medium);
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
