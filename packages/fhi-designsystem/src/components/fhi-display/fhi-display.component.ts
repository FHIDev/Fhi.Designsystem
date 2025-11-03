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
   * Sets text color. Accepts the same values as the CSS property: https://developer.mozilla.org/en-US/docs/Web/CSS/color.
   * @attr
   * @type {string}
   */
  @property({ type: String }) color?: string;

  /**
   * Indicates the display tag level, i.e. 'level=2' gives '<h2>'.
   * @attr level
   * @type {1 | 2 | 3 | 4 | 5 | 6}
   */
  @property({ type: Number }) level: DisplayLevel = 1;

  /** @internal */
  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

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
      --font-size-large: var(--fhi-typography-display-large-font-size);
      --line-height-large: var(--fhi-typography-display-large-line-height);
      --letter-spacing-large: var(
        --fhi-typography-display-large-letter-spacing
      );

      --font-size-medium: var(--fhi-typography-display-medium-font-size);
      --line-height-medium: var(--fhi-typography-display-medium-line-height);
      --letter-spacing-medium: var(
        --fhi-typography-display-medium-letter-spacing
      );

      --font-size-small: var(--fhi-typography-display-small-font-size);
      --line-height-small: var(--fhi-typography-display-small-line-height);
      --letter-spacing-small: var(
        --fhi-typography-display-small-letter-spacing
      );
    }

    :host {
      display: block;
      contain: layout;
      color: var(--fhi-color-neutral-text-default);
    }

    .display {
      font-weight: var(--fhi-font-weight-regular);
      font-family: var(--fhi-font-family-default);
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
