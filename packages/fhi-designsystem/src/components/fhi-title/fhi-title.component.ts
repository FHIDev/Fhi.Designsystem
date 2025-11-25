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
 * The `<fhi-title>` component is used to display title text in accordance with the FHI Design System guidelines.
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
   * @attr
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

    if (changedProperties.has('color') && typeof this.color == 'string') {
      this.style.color = this.color;
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
      --font-size-large: var(--fhi-typography-title-large-font-size);
      --font-weight-large: var(--fhi-typography-title-large-font-weight);
      --line-height-large: var(--fhi-typography-title-large-line-height);
      --letter-spacing-large: var(--fhi-typography-title-large-letter-spacing);

      --font-size-medium: var(--fhi-typography-title-medium-font-size);
      --font-weight-medium: var(--fhi-typography-title-medium-font-weight);
      --line-height-medium: var(--fhi-typography-title-medium-line-height);
      --letter-spacing-medium: var(
        --fhi-typography-title-medium-letter-spacing
      );

      --font-size-small: var(--fhi-typography-title-small-font-size);
      --font-weight-small: var(--fhi-typography-title-small-font-weight);
      --line-height-small: var(--fhi-typography-title-small-line-height);
      --letter-spacing-small: var(--fhi-typography-title-small-letter-spacing);
    }

    :host {
      display: block;
      contain: layout;
      color: var(--fhi-color-neutral-text-default);
      .title {
        font-weight: var(--fhi-font-weight-bold);
        font-weight: var(--font-weight-large);
        font-family: var(--fhi-font-family-default);
        -webkit-font-smoothing: antialiased;
        margin: 0;
      }
    }

    :host([size='large']) {
      .title {
        font-size: var(--font-size-large);
        font-weight: var(--font-weight-large);
        line-height: var(--line-height-large);
        letter-spacing: var(--letter-spacing-large);
      }
    }

    :host([size='medium']) {
      .title {
        font-size: var(--font-size-medium);
        font-weight: var(--font-weight-medium);
        line-height: var(--line-height-medium);
        letter-spacing: var(--letter-spacing-medium);
      }
    }

    :host([size='small']) {
      .title {
        font-size: var(--font-size-small);
        font-weight: var(--font-weight-small);
        line-height: var(--line-height-small);
        letter-spacing: var(--letter-spacing-small);
      }
    }
  `;
}
