import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiFlexSelector = 'fhi-flex';
type FhiUnitType = 'px' | 'rem';
type FhiGapWidthUnit = `${number}${FhiUnitType}` | number;

@customElement(FhiFlexSelector)
export class FhiFlex extends LitElement {
  @property({ type: String, reflect: true }) direction: 'row' | 'column' =
    'row';
  @property({ type: String, reflect: true }) gap:
    | 'small'
    | 'medium'
    | 'large'
    | FhiGapWidthUnit = 'medium';
  @property({ type: Boolean, reflect: true }) wrap = false;

  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);
    if (changedProperties.has('gap')) {
      const isPresetGap = ['small', 'medium', 'large'].includes(
        this.gap as string,
      );
      if (!isPresetGap) {
        const gapValue = Number(this.gap) ? `${this.gap}px` : this.gap;
        this.style.gap = gapValue as string;
      } else {
        this.style.gap = '';
      }
    }
  }

  render() {
    return html`<slot></slot>`;
  }

  static styles = css`
    :host {
      --spacing-gap-small: var(--fhi-spacing-100);
      --spacing-gap-medium: var(--fhi-spacing-200);
      --spacing-gap-large: var(--fhi-spacing-300);
    }
    :host {
      display: flex;
      gap: var(--spacing-gap-medium);
    }
    :host([wrap]) {
      flex-wrap: wrap;
    }
    :host([direction='row']) {
      flex-direction: row;
    }
    :host([direction='column']) {
      flex-direction: column;
    }
    :host([gap='small']) {
      gap: var(--spacing-gap-small);
    }
    :host([gap='medium']) {
      gap: var(--spacing-gap-medium);
    }
    :host([gap='large']) {
      gap: var(--spacing-gap-large);
    }
  `;
}
