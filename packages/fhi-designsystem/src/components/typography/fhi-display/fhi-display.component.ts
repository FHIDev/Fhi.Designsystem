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
 * The `<fhi-display>` component is used to display large, eye-catching headline text in accordance with the FHI Design System guidelines.
 *
 * For smaller, less prominent title text, use the `<fhi-title>` component instead.
 *
 * For standard headline text, use the `<fhi-headline>` component instead.
 *
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
      const levelAsNumber = Number(this.level);
      if (isNaN(levelAsNumber) || levelAsNumber < 1 || levelAsNumber > 6) {
        console.error(
          new TypeError(
            `The level property must be set to a number between 1 and 6. Current value: ${this.level}`,
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
      --fhi-display-font-size: unset;
      --fhi-display-font-weight: unset;
      --fhi-display-line-height: unset;
      --fhi-display-letter-spacing: unset;
    }

    :host {
      display: block;
      contain: layout;
      color: var(--fhi-color-neutral-text-default);
      .display {
        font-family: var(--fhi-font-family-default);
        -webkit-font-smoothing: antialiased;
        margin: 0;
        font-size: var(--fhi-display-font-size);
        font-weight: var(--fhi-display-font-weight);
        line-height: var(--fhi-display-line-height);
        letter-spacing: var(--fhi-display-letter-spacing);
      }
    }

    :host([size='large']) {
      .display {
        --fhi-display-font-size: var(--fhi-typography-display-large-font-size);
        --fhi-display-font-weight: var(
          --fhi-typography-display-large-font-weight
        );
        --fhi-display-line-height: var(
          --fhi-typography-display-large-line-height
        );
        --fhi-display-letter-spacing: var(
          --fhi-typography-display-large-letter-spacing
        );
      }
    }

    :host([size='medium']) {
      .display {
        --fhi-display-font-size: var(--fhi-typography-display-medium-font-size);
        --fhi-display-font-weight: var(
          --fhi-typography-display-medium-font-weight
        );
        --fhi-display-line-height: var(
          --fhi-typography-display-medium-line-height
        );
        --fhi-display-letter-spacing: var(
          --fhi-typography-display-medium-letter-spacing
        );
      }
    }

    :host([size='small']) {
      .display {
        --fhi-display-font-size: var(--fhi-typography-display-small-font-size);
        --fhi-display-font-weight: var(
          --fhi-typography-display-small-font-weight
        );
        --fhi-display-line-height: var(
          --fhi-typography-display-small-line-height
        );
        --fhi-display-letter-spacing: var(
          --fhi-typography-display-small-letter-spacing
        );
      }
    }
  `;
}
