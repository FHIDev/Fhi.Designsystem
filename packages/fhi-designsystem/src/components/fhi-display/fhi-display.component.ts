import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export const FhiDisplaySelector = 'fhi-display';

export type DisplayLevel = 1 | 2 | 3 | 4 | 5 | 6;

@customElement(FhiDisplaySelector)
export class FhiDisplay extends LitElement {
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

  /**
   * Indicates the display tag level.
   * @attr level
   * @type {1 | 2 | 3 | 4 | 5 | 6}
   */
  @property({ type: Number }) level!: DisplayLevel;

  /** @internal */
  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    if (!this.level) {
      throw new Error(`level is a required attribute.`);
    }

    if (changedProperties.has('color') && typeof this.color == 'string') {
      this.style.color = this.color;
    }
  }

  render() {
    const template = `
      <h${this.level} class="display">
        <slot></slot>
      </h${this.level}>
    `;
    return html`${unsafeHTML(template)}`;
  }

  static styles = css`
    :host {
      --font-size-large: var(--fhi-font-size-14);
      --line-height-large: var(--fhi-typography-display-large-line-height);
      --letter-spacing-large: var(
        --fhi-typography-display-large-letter-spacing
      );

      --font-size-medium: var(--fhi-font-size-12);
      --line-height-medium: var(--fhi-typography-display-medium-line-height);
      --letter-spacing-medium: var(
        --fhi-typography-display-medium-letter-spacing
      );

      --font-size-small: var(--fhi-font-size-10);
      --line-height-small: var(--fhi-typography-display-small-line-height);
      --letter-spacing-small: var(
        --fhi-typography-display-small-letter-spacing
      );
    }

    :host {
      display: block;
      contain: layout;
    }

    .display {
      font-weight: var(--fhi-font-weight-regular);
      font-family: var(--fhi-font-family-default);
      color: var(--fhi-color-neutral-text-default);
      margin: 0;
    }

    :host([size='large']) {
      .display {
        font-size: var(--font-size-large);
        line-height: var(--line-height-large);
        letter-spacing: var(--letter-spacing-large);
      }
    }

    :host([size='medium']) {
      .display {
        font-size: var(--font-size-medium);
        line-height: var(--line-height-medium);
        letter-spacing: var(--letter-spacing-medium);
      }
    }

    :host([size='small']) {
      .display {
        font-size: var(--font-size-small);
        line-height: var(--line-height-small);
        letter-spacing: var(--letter-spacing-small);
      }
    }
  `;
}
