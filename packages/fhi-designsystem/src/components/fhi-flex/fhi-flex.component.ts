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
      --dimension-gap-small: var(--fhi-spacing-100);
      --dimension-gap-medium: var(--fhi-spacing-200);
      --dimension-gap-large: var(--fhi-spacing-300);
    }

    :host {
      display: flex;
      gap: var(--dimension-gap-medium);
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
      gap: var(--dimension-gap-small);
    }

    :host([gap='medium']) {
      gap: var(--dimension-gap-medium);
    }

    :host([gap='large']) {
      gap: var(--dimension-gap-large);
    }
  `;
}
