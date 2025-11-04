import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export const FhiTitleSelector = 'fhi-title';

export type TitleLevel = 1 | 2 | 3 | 4 | 5 | 6;

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
   * Sets text color. Accepts the same values as the CSS property: https://developer.mozilla.org/en-US/docs/Web/CSS/color.
   * @attr
   * @type {string}
   */
  @property({ type: String }) color?: string;

  /**
   * Indicates the title tag level, i.e. 'level=2' gives '<h2>'.
   * @attr level
   * @type {1 | 2 | 3 | 4 | 5 | 6}
   */
  @property({ type: Number }) level!: TitleLevel;

  /** @internal */
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
