import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiLabelSelector = 'fhi-label';

/**
 * ## FHI Label
 *
 * {@link https://designsystem.fhi.no/?path=/story/komponenter-typography-label--preview}
 *
 * The `<fhi-label>` component is used to display label text in accordance with the FHI Design System guidelines.
 * Use this component instead of the standard HTML `<label>` element to ensure consistent styling across your application.
 *
 * @tag fhi-label
 * @element fhi-label
 *
 * @slot - The content of the fhi-label component. This should be pure text.
 */
@customElement(FhiLabelSelector)
export class FhiLabel extends LitElement {
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
   *  <fhi-label color="var(--fhi-color-primary-text-default)">
   *    This text will be in the primary text color.
   *  </fhi-label>
   * ```
   *
   * @type {string}
   */
  @property({ type: String }) color?: string = 'currentcolor';

  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    if (changedProperties.has('color')) {
      this.style.color =
        typeof this.color === 'string' ? this.color : 'currentcolor';
    }
  }

  render() {
    return html`
      <span class="label">
        <slot></slot>
      </span>
    `;
  }

  static styles = css`
    :host {
      display: block;
      contain: layout;
      .label {
        font-family: var(--fhi-font-family-default);
        -webkit-font-smoothing: antialiased;
        margin: 0;
      }
    }

    :host([size='large']) {
      .label {
        font-size: var(--fhi-typography-label-large-font-size);
        font-weight: var(--fhi-typography-label-large-font-weight);
        line-height: var(--fhi-typography-label-large-line-height);
        letter-spacing: var(--fhi-typography-label-large-letter-spacing);
      }
    }

    :host([size='medium']) {
      .label {
        font-size: var(--fhi-typography-label-medium-font-size);
        font-weight: var(--fhi-typography-label-medium-font-weight);
        line-height: var(--fhi-typography-label-medium-line-height);
        letter-spacing: var(--fhi-typography-label-medium-letter-spacing);
      }
    }

    :host([size='small']) {
      .label {
        font-size: var(--fhi-typography-label-small-font-size);
        font-weight: var(--fhi-typography-label-small-font-weight);
        line-height: var(--fhi-typography-label-small-line-height);
        letter-spacing: var(--fhi-typography-label-small-letter-spacing);
      }
    }
  `;
}
