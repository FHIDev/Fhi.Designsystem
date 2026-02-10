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
 * The `<fhi-headline>` component is used to display headline text in accordance with the FHI Design System guidelines.
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
   *
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
   *
   */
  @property({ type: String }) color?: string;

  /**
   * Sets the heading level for the text, corresponding to HTML heading elements `<h1>` to `<h6>`.
   *
   */
  @property({ type: Number }) level!: HeadlineLevel;

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
      --font-size-large: var(--fhi-typography-headline-large-font-size);
      --font-weight-large: var(--fhi-typography-headline-large-font-weight);
      --line-height-large: var(--fhi-typography-headline-large-line-height);
      --letter-spacing-large: var(
        --fhi-typography-headline-large-letter-spacing
      );

      --font-size-medium: var(--fhi-typography-headline-medium-font-size);
      --font-weight-medium: var(--fhi-typography-headline-medium-font-weight);
      --line-height-medium: var(--fhi-typography-headline-medium-line-height);
      --letter-spacing-medium: var(
        --fhi-typography-headline-medium-letter-spacing
      );

      --font-size-small: var(--fhi-typography-headline-small-font-size);
      --font-weight-small: var(--fhi-typography-headline-small-font-weight);
      --line-height-small: var(--fhi-typography-headline-small-line-height);
      --letter-spacing-small: var(
        --fhi-typography-headline-small-letter-spacing
      );
    }

    :host {
      display: block;
      contain: layout;
      color: var(--fhi-color-neutral-text-default);
      .headline {
        font-family: var(--fhi-font-family-default);
        -webkit-font-smoothing: antialiased;
        margin: 0;
      }
    }

    :host([size='large']) {
      .headline {
        font-size: var(--font-size-large);
        font-weight: var(--font-weight-large);
        line-height: var(--line-height-large);
        letter-spacing: var(--letter-spacing-large);
      }
    }

    :host([size='medium']) {
      .headline {
        font-size: var(--font-size-medium);
        font-weight: var(--font-weight-medium);
        line-height: var(--line-height-medium);
        letter-spacing: var(--letter-spacing-medium);
      }
    }

    :host([size='small']) {
      .headline {
        font-size: var(--font-size-small);
        font-weight: var(--font-weight-small);
        line-height: var(--line-height-small);
        letter-spacing: var(--letter-spacing-small);
      }
    }
  `;
}
