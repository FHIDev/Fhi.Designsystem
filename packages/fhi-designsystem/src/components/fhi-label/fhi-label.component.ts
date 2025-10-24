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
   * Sets text color.
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
      --font-size-large: var(--fhi-font-size-5);
      --line-height-large: 1.5rem;
      --letter-spacing-large: 0.00125rem;

      --font-size-medium: var(--fhi-font-size-4);
      --line-height-medium: 1.5rem;
      --letter-spacing-medium: 0.005rem;

      --font-size-small: var(--fhi-font-size-3);
      --line-height-small: 1.25rem;
      --letter-spacing-small: 0.00875rem;
    }

    :host {
      display: block;
      contain: layout;
    }

    .label {
      font-weight: var(--fhi-font-weight-medium);
      font-family: var(--fhi-font-family-default);
      color: var(--fhi-color-neutral-text-default);
      margin: 0;
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
