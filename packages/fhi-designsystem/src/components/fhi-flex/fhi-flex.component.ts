import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiFlexSelector = 'fhi-flex';
type FhiUnitType = 'px' | 'rem';
type FhiGapWidthUnit = `${number}${FhiUnitType}` | number;

/**
 * ## FHI Flex
 *
 * A layout component for creating flexible box layouts. It is a wrapper around the CSS Flexbox module.
 *
 * {@link https://designsystem.fhi.no/?path=/docs/komponenter-flex--docs}
 *
 * @tag fhi-flex
 * @element fhi-flex
 *
 */
@customElement(FhiFlexSelector)
export class FhiFlex extends LitElement {
  /**
   * Sets the direction of the flex items.
   * @attr
   * @type {'row' | 'column'}
   */
  @property({ type: String, reflect: true }) direction: 'row' | 'column' =
    'row';

  /**
   * Sets the gap between flex items. Can be a preset value ('small', 'medium', 'large') or a custom CSS value (e.g., '20px', '1.5rem').
   * @attr
   * @type {'small' | 'medium' | 'large' | number | string}
   */
  @property({ type: String, reflect: true }) gap:
    | 'small'
    | 'medium'
    | 'large'
    | FhiGapWidthUnit = 'medium';

  /**
   * Allows flex items to wrap onto multiple lines.
   * @attr
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) wrap = false;

  /**
   * Aligns flex items along the main axis.
   * @attr
   * @type {'start' | 'center' | 'end'}
   */
  @property({ type: String }) justify: 'start' | 'center' | 'end' = 'start';

  /**
   * Aligns flex items along the cross axis.
   * @attr
   * @type {'stretch' | 'start' | 'center' | 'end' | 'baseline'}
   */
  @property({ type: String }) align:
    | 'stretch'
    | 'start'
    | 'center'
    | 'end'
    | 'baseline' = 'stretch';

  /** @internal */
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

    :host([justify='center']) {
      justify-content: center;
    }

    :host([justify='start']) {
      justify-content: start;
    }

    :host([justify='end']) {
      justify-content: end;
    }

    :host([align='stretch']) {
      align-items: stretch;
    }

    :host([align='center']) {
      align-items: center;
    }

    :host([align='start']) {
      align-items: start;
    }

    :host([align='end']) {
      align-items: end;
    }

    :host([align='baseline']) {
      align-items: baseline;
    }
  `;
}
