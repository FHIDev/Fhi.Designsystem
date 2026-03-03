import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export const FhiDisplaySelector = 'fhi-display';

export type DisplayLevel = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * ## FHI Display
 *
 * {@link https://designsystem.fhi.no/?path=/story/komponenter-typography-display--preview}
 *
 * The `<fhi-display>` component is used to display large headline text in accordance with the FHI Design System guidelines.
 * Use this component instead of the standard HTML heading elements, `<h1>` - `<h6>`, to ensure consistent styling across your application.
 *
 * @tag fhi-display
 * @element fhi-display
 *
 * @slot - The content of the fhi-display component. This should be pure text.
 */
@customElement(FhiDisplaySelector)
export class FhiDisplay extends LitElement {
  /**
   * Sets the font size of the given text.
   * @reflect
   * @type {'large' | 'medium' | 'small'}
   */
  @property({ type: String, reflect: true }) size:
    | 'large'
    | 'medium'
    | 'small' = 'medium';

  /**
   * Sets color of the given text. It supports any valid CSS color value (e.g. hex, rgb, rgba, hsl, hsla, color names).
   *
   * It is recommended to use Design Tokens for colors defined in the FHI Design System.
   * See: {@link https://designsystem.fhi.no/?path=/docs/design-tokens-farger--docs}
   *
   * Example:
   * ```html
   *  <fhi-display color="var(--fhi-color-primary-text-default)">
   *    This text will be in the primary text color.
   *  </fhi-display>
   * ```
   *
   * @type {string}
   */
  @property({ type: String }) color?: string;

  /**
   * Sets the heading level for the text, corresponding to HTML heading elements `<h1>` to `<h6>`.
   * @type {1 | 2 | 3 | 4 | 5 | 6}
   */
  @property({ type: Number }) level!: DisplayLevel;

  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    if (changedProperties.has('level')) {
      if (typeof this.level !== 'number' || this.level < 1 || this.level > 6) {
        console.error(
          new TypeError(
            `The level property must be set to a valid value. invalid value: ${this.level}`,
          ),
        );
      }
    }

    if (changedProperties.has('color')) {
      this.style.color =
        typeof this.color === 'string'
          ? this.color
          : 'var(--fhi-color-neutral-text-default)';
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
      --font-weight-large: var(--fhi-typography-display-large-font-weight);
      --line-height-large: var(--fhi-typography-display-large-line-height);
      --letter-spacing-large: var(
        --fhi-typography-display-large-letter-spacing
      );

      --font-size-medium: var(--fhi-typography-display-medium-font-size);
      --font-weight-medium: var(--fhi-typography-display-medium-font-weight);
      --line-height-medium: var(--fhi-typography-display-medium-line-height);
      --letter-spacing-medium: var(
        --fhi-typography-display-medium-letter-spacing
      );

      --font-size-small: var(--fhi-typography-display-small-font-size);
      --font-weight-small: var(--fhi-typography-display-small-font-weight);
      --line-height-small: var(--fhi-typography-display-small-line-height);
      --letter-spacing-small: var(
        --fhi-typography-display-small-letter-spacing
      );
    }

    :host {
      display: block;
      contain: layout;
      color: var(--fhi-color-neutral-text-default);
      .display {
        font-family: var(--fhi-font-family-default);
        -webkit-font-smoothing: antialiased;
        margin: 0;
      }
    }

    :host([size='large']) {
      .display {
        font-size: var(--font-size-large);
        font-weight: var(--font-weight-large);
        line-height: var(--line-height-large);
        letter-spacing: var(--letter-spacing-large);
      }
    }

    :host([size='medium']) {
      .display {
        font-size: var(--font-size-medium);
        font-weight: var(--font-weight-medium);
        line-height: var(--line-height-medium);
        letter-spacing: var(--letter-spacing-medium);
      }
    }

    :host([size='small']) {
      .display {
        font-size: var(--font-size-small);
        font-weight: var(--font-weight-small);
        line-height: var(--line-height-small);
        letter-spacing: var(--letter-spacing-small);
      }
    }
  `;
}
