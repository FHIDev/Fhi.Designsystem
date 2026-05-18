import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export const FhiHeadlineSelector = 'fhi-headline';

export type HeadlineLevel = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * ## FHI Headline
 *
 * {@link https://designsystem.fhi.no/?path=/story/komponenter-typography-headline--preview}
 *
 * The `<fhi-headline>` component is used to display standard headline text in accordance with the FHI Design System guidelines.
 *
 * For smaller, less prominent title text, use the `<fhi-title>` component instead.
 *
 * For larger, more prominent headline text, use the `<fhi-display>` component instead.
 *
 * Use this component instead of the standard HTML heading elements, `<h1>` - `<h6>`, to ensure consistent styling across your application.
 *
 * @tag fhi-headline
 * @element fhi-headline
 *
 * @slot - The content of the fhi-headline component. This should be pure text.
 */
@customElement(FhiHeadlineSelector)
export class FhiHeadline extends LitElement {
  /**
   * Sets the size of the text styles.
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
   *  <fhi-headline color="var(--fhi-color-primary-text-default)">
   *    This text will be in the primary text color.
   *  </fhi-headline>
   * ```
   *
   * @type {string}
   */
  @property({ type: String }) color?: string;

  /**
   * Sets the heading level for the text, corresponding to HTML heading elements `<h1>` to `<h6>`.
   * @type {1 | 2 | 3 | 4 | 5 | 6}
   */
  @property({ type: Number }) level!: HeadlineLevel;

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
      <h${this.level} class="headline">
        <slot></slot>
      </h${this.level}>
    `;
    return html`${unsafeHTML(template)}`;
  }

  static styles = css`
    :host {
      --fhi-headline-font-size: unset;
      --fhi-headline-font-weight: unset;
      --fhi-headline-line-height: unset;
      --fhi-headline-letter-spacing: unset;
    }

    :host {
      display: block;
      contain: layout;
      color: var(--fhi-color-neutral-text-default);
      .headline {
        font-family: var(--fhi-font-family-default);
        -webkit-font-smoothing: antialiased;
        margin: 0;
        font-size: var(--fhi-headline-font-size);
        font-weight: var(--fhi-headline-font-weight);
        line-height: var(--fhi-headline-line-height);
        letter-spacing: var(--fhi-headline-letter-spacing);
      }
    }

    :host([size='large']) {
      .headline {
        --fhi-headline-font-size: var(
          --fhi-typography-headline-large-font-size
        );
        --fhi-headline-font-weight: var(
          --fhi-typography-headline-large-font-weight
        );
        --fhi-headline-line-height: var(
          --fhi-typography-headline-large-line-height
        );
        --fhi-headline-letter-spacing: var(
          --fhi-typography-headline-large-letter-spacing
        );
      }
    }

    :host([size='medium']) {
      .headline {
        --fhi-headline-font-size: var(
          --fhi-typography-headline-medium-font-size
        );
        --fhi-headline-font-weight: var(
          --fhi-typography-headline-medium-font-weight
        );
        --fhi-headline-line-height: var(
          --fhi-typography-headline-medium-line-height
        );
        --fhi-headline-letter-spacing: var(
          --fhi-typography-headline-medium-letter-spacing
        );
      }
    }

    :host([size='small']) {
      .headline {
        --fhi-headline-font-size: var(
          --fhi-typography-headline-small-font-size
        );
        --fhi-headline-font-weight: var(
          --fhi-typography-headline-small-font-weight
        );
        --fhi-headline-line-height: var(
          --fhi-typography-headline-small-line-height
        );
        --fhi-headline-letter-spacing: var(
          --fhi-typography-headline-small-letter-spacing
        );
      }
    }
  `;
}
