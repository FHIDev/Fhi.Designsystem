import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export const FhiHeadlineSelector = 'fhi-headline';

export type HeadlineLevel = 1 | 2 | 3 | 4 | 5 | 6;

@customElement(FhiHeadlineSelector)
export class FhiHeadline extends LitElement {
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
   * Indicates the headline tag level, i.e. 'level=2' gives '<h2>'.
   * @attr level
   * @type {1 | 2 | 3 | 4 | 5 | 6}
   */
  @property({ type: Number }) level: HeadlineLevel = 1;

  /** @internal */
  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    if (changedProperties.has('color') && typeof this.color == 'string') {
      this.style.color = this.color;
    }
  }

  render() {
    const template = `
      <h${this.level} class="headline">
        <slot></slot>
      </h${this.level}>
    `;
    return html`${unsafeHTML(template)}`;
  }

  static styles = css`
    :host {
      --font-size-large: var(--fhi-font-size-8);
      --line-height-large: var(--fhi-typography-headline-large-line-height);
      --letter-spacing-large: var(
        --fhi-typography-headline-large-letter-spacing
      );

      --font-size-medium: var(--fhi-font-size-7);
      --line-height-medium: var(--fhi-typography-headline-medium-line-height);
      --letter-spacing-medium: var(
        --fhi-typography-headline-medium-letter-spacing
      );

      --font-size-small: var(--fhi-font-size-6);
      --line-height-small: var(--fhi-typography-headline-small-line-height);
      --letter-spacing-small: var(
        --fhi-typography-headline-small-letter-spacing
      );
    }

    :host {
      display: block;
      contain: layout;
      color: var(--fhi-color-neutral-text-default);
    }

    .headline {
      font-weight: var(--fhi-font-weight-medium);
      font-family: var(--fhi-font-family-default);
      margin: 0;
    }

    :host([size='large']) {
      .headline {
        font-size: var(--font-size-large);
        line-height: var(--line-height-large);
        letter-spacing: var(--letter-spacing-large);
      }
    }

    :host([size='medium']) {
      .headline {
        font-size: var(--font-size-medium);
        line-height: var(--line-height-medium);
        letter-spacing: var(--letter-spacing-medium);
      }
    }

    :host([size='small']) {
      .headline {
        font-size: var(--font-size-small);
        line-height: var(--line-height-small);
        letter-spacing: var(--letter-spacing-small);
      }
    }
  `;
}
