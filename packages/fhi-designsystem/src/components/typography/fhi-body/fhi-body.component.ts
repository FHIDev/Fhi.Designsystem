import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiBodySelector = 'fhi-body';

/**
 * ## FHI Body
 *
 * {@link https://designsystem.fhi.no/?path=/story/komponenter-typography-body--preview}
 *
 * The `<fhi-body>` component is used to display body text in accordance with the FHI Design System guidelines.
 * Use this component instead of the standard HTML paragraph element, `<p>`, to ensure consistent styling across your application.
 *
 * @tag fhi-body
 * @element fhi-body
 *
 * @slot - The content of the fhi-body component. This should be pure text.
 */
@customElement(FhiBodySelector)
export class FhiBody extends LitElement {
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
   *  <fhi-body color="var(--fhi-color-primary-text-default)">
   *    This text will be in the primary text color.
   *  </fhi-body>
   * ```
   *
   * @type {string}
   */
  @property({ type: String }) color?: string;

  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    if (changedProperties.has('color')) {
      this.style.color =
        typeof this.color === 'string' ? this.color : 'var(--fhi-body-color)';
    }
  }

  render() {
    return html`
      <span class="body">
        <slot></slot>
      </span>
    `;
  }

  static styles = css`
    :host {
      --fhi-body-color: unset;
    }

    :host {
      --fhi-body-color: currentcolor;

      display: block;
      contain: layout;
      color: var(--fhi-body-color);
      .body {
        font-family: var(--fhi-font-family-default);
        -webkit-font-smoothing: antialiased;
        margin: 0;
      }
    }

    :host([size='large']) {
      .body {
        font-size: var(--fhi-typography-body-large-font-size);
        font-weight: var(--fhi-typography-body-large-font-weight);
        line-height: var(--fhi-typography-body-large-line-height);
        letter-spacing: var(--fhi-typography-body-large-letter-spacing);
      }
    }

    :host([size='medium']) {
      .body {
        font-size: var(--fhi-typography-body-medium-font-size);
        font-weight: var(--fhi-typography-body-medium-font-weight);
        line-height: var(--fhi-typography-body-medium-line-height);
        letter-spacing: var(--fhi-typography-body-medium-letter-spacing);
      }
    }

    :host([size='small']) {
      .body {
        font-size: var(--fhi-typography-body-small-font-size);
        font-weight: var(--fhi-typography-body-small-font-weight);
        line-height: var(--fhi-typography-body-small-line-height);
        letter-spacing: var(--fhi-typography-body-small-letter-spacing);
      }
    }
  `;
}
