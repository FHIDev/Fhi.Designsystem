import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export const FhiTitleSelector = 'fhi-title';

export type TitleLevel = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * ## FHI Title
 *
 * {@link https://designsystem.fhi.no/?path=/story/komponenter-typography-title--preview}
 *
 * The `<fhi-title>` component is used to display smaller, less prominent title text in accordance with the FHI Design System guidelines.
 *
 * For standard headline text, use the `<fhi-headline>` component instead.
 *
 * For larger, more prominent headline text, use the `<fhi-display>` component instead.
 *
 * Use this component instead of the standard HTML heading elements, `<h1>` - `<h6>`, to ensure consistent styling across your application.
 *
 * @tag fhi-title
 * @element fhi-title
 *
 * @slot - The content of the fhi-title component. This should be pure text.
 */
@customElement(FhiTitleSelector)
export class FhiTitle extends LitElement {
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
   *  <fhi-title color="var(--fhi-color-primary-text-default)">
   *    This text will be in the primary text color.
   *  </fhi-title>
   * ```
   *
   * @type {string}
   */
  @property({ type: String }) color?: string;

  /**
   * Sets the heading level for the text, corresponding to HTML heading elements `<h1>` to `<h6>`.
   * @type {1 | 2 | 3 | 4 | 5 | 6}
   */
  @property({ type: Number }) level!: TitleLevel;

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
      <h${this.level} class="title">
        <slot></slot>
      </h${this.level}>
    `;
    return html`${unsafeHTML(template)}`;
  }

  static styles = css`
    :host {
      --fhi-title-font-size: unset;
      --fhi-title-font-weight: unset;
      --fhi-title-line-height: unset;
      --fhi-title-letter-spacing: unset;
    }

    :host {
      display: block;
      contain: layout;
      color: var(--fhi-color-neutral-text-default);
      .title {
        font-family: var(--fhi-font-family-default);
        -webkit-font-smoothing: antialiased;
        margin: 0;
        font-size: var(--fhi-title-font-size);
        font-weight: var(--fhi-title-font-weight);
        line-height: var(--fhi-title-line-height);
        letter-spacing: var(--fhi-title-letter-spacing);
      }
    }

    :host([size='large']) {
      .title {
        --fhi-title-font-size: var(--fhi-typography-title-large-font-size);
        --fhi-title-font-weight: var(--fhi-typography-title-large-font-weight);
        --fhi-title-line-height: var(--fhi-typography-title-large-line-height);
        --fhi-title-letter-spacing: var(
          --fhi-typography-title-large-letter-spacing
        );
      }
    }

    :host([size='medium']) {
      .title {
        --fhi-title-font-size: var(--fhi-typography-title-medium-font-size);
        --fhi-title-font-weight: var(--fhi-typography-title-medium-font-weight);
        --fhi-title-line-height: var(--fhi-typography-title-medium-line-height);
        --fhi-title-letter-spacing: var(
          --fhi-typography-title-medium-letter-spacing
        );
      }
    }

    :host([size='small']) {
      .title {
        --fhi-title-font-size: var(--fhi-typography-title-small-font-size);
        --fhi-title-font-weight: var(--fhi-typography-title-small-font-weight);
        --fhi-title-line-height: var(--fhi-typography-title-small-line-height);
        --fhi-title-letter-spacing: var(
          --fhi-typography-title-small-letter-spacing
        );
      }
    }
  `;
}
