import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiLabelSelector = 'fhi-label';

@customElement(FhiLabelSelector)
export class FhiLabel extends LitElement {
  /**
   * Sets the size of the text styles.
   * @attr
   * @type {'large' | 'medium' | 'small'}
   */
  @property({ type: String, reflect: true }) size:
    | 'large'
    | 'medium'
    | 'small' = 'medium';

  /**
   * Sets text color. Accepts the same values as the CSS property: https://developer.mozilla.org/en-US/docs/Web/CSS/color.
   * @attr
   * @type {string}
   */
  @property({ type: String }) color?: string;

  /** @internal */
  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    if (changedProperties.has('color') && typeof this.color == 'string') {
      this.style.color = this.color;
    }
  }

  render() {
    return html`
      <span class="label">
        <slot></slot>
      </span>
    `;
  }

  static styles = css`
    :host {
      --font-size-large: var(--fhi-typography-label-large-font-size);
      --line-height-large: var(--fhi-typography-label-large-line-height);
      --letter-spacing-large: var(--fhi-typography-label-large-letter-spacing);

      --font-size-medium: var(--fhi-typography-label-medium-font-size);
      --line-height-medium: var(--fhi-typography-label-medium-line-height);
      --letter-spacing-medium: var(
        --fhi-typography-label-medium-letter-spacing
      );

      --font-size-small: var(--fhi-typography-label-small-font-size);
      --line-height-small: var(--fhi-typography-label-small-line-height);
      --letter-spacing-small: var(--fhi-typography-label-small-letter-spacing);
    }

    :host {
      display: block;
      contain: layout;
      color: var(--fhi-color-neutral-text-default);
      .label {
        font-weight: var(--fhi-font-weight-medium);
        font-family: var(--fhi-font-family-default);
        margin: 0;
      }
    }

    :host([size='large']) {
      .label {
        font-size: var(--font-size-large);
        line-height: var(--line-height-large);
        letter-spacing: var(--letter-spacing-large);
      }
    }

    :host([size='medium']) {
      .label {
        font-size: var(--font-size-medium);
        line-height: var(--line-height-medium);
        letter-spacing: var(--letter-spacing-medium);
      }
    }

    :host([size='small']) {
      .label {
        font-size: var(--font-size-small);
        line-height: var(--line-height-small);
        letter-spacing: var(--letter-spacing-small);
      }
    }
  `;
}
