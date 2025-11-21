import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiFlexSelector = 'fhi-flex';
type FhiUnitType = 'px' | 'rem';
type FhiGapWidthUnit = `${number}${FhiUnitType}` | number;

/**
 * ## FHI Flex
 *
 * The `<fhi-flex>` component is a flexible container that utilizes CSS Flexbox to arrange its child elements in a responsive layout.
 * It allows for easy alignment, spacing, and direction control of its items.
 *
 * {@link https://designsystem.fhi.no/?path=/docs/komponenter-flex--docs}
 *
 * @tag fhi-flex
 * @element fhi-flex
 *
 * @slot - The content of the flex container. This can include any elements or text.
 *
 */
@customElement(FhiFlexSelector)
export class FhiFlex extends LitElement {
  /**
   * Sets the flex direction to either row or column.
   * This determines the main axis along which the flex items are laid out.
   * @reflect
   * @type {'row' | 'column'}
   */
  @property({ type: String, reflect: true }) direction: 'row' | 'column' =
    'row';

  /**
   * Sets the gap between items within the flex container.
   * It can be one of the preset values, a rem value, or a number.
   * If you give a number, it will be treated as pixels.
   * @reflect
   * @type {'small' | 'medium' | 'large' | number | string}
   */
  @property({ type: String, reflect: true }) gap:
    | 'small'
    | 'medium'
    | 'large'
    | FhiGapWidthUnit = 'medium';

  /**
   * Enables wrapping of flex items onto multiple lines if they exceed the container's width.
   * @reflect
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) wrap = false;

  /**
   * Justifies flex items along the main axis.
   * @type {'start' | 'center' | 'end'}
   */
  @property({ type: String }) justify: 'start' | 'center' | 'end' = 'start';

  /**
   * Aligns flex items along the cross axis.
   * @type {'stretch' | 'start' | 'center' | 'end' | 'baseline'}
   */
  @property({ type: String }) align:
    | 'stretch'
    | 'start'
    | 'center'
    | 'end'
    | 'baseline' = 'stretch';

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
