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
   * Sets text color.
   * @attr
   * @type {string}
   */
  @property({ type: String }) color?: string;

  /**
   * Indicates the title tag level.
   * @attr level
   * @type {1 | 2 | 3 | 4 | 5 | 6}
   */
  @property({ type: Number }) level!: TitleLevel;

  /** @internal */
  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    if (!this.level) {
      throw new Error(`level is a required attribute.`);
    }

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
      --font-size-large: var(--fhi-font-size-5);
      --line-height-large: 1.5rem;
      --letter-spacing-large: 0.0012rem;

      --font-size-medium: var(--fhi-font-size-4);
      --line-height-medium: 1.25rem;
      --letter-spacing-medium: 0.005rem;

      --font-size-small: var(--fhi-font-size-3);
      --line-height-small: 1.25rem;
      --letter-spacing-small: 0.0088rem;
    }

    :host {
      display: block;
      contain: layout;
    }

    .title {
      font-weight: var(--fhi-font-weight-bold);
      font-family: var(--fhi-font-family-default);
      color: var(--fhi-color-neutral-text-default);
      margin: 0;
    }

    :host([size='large']) {
      .title {
        font-size: var(--font-size-large);
        line-height: var(--line-height-large);
        letter-spacing: var(--letter-spacing-large);
      }
    }

    :host([size='medium']) {
      .title {
        font-size: var(--font-size-medium);
        line-height: var(--line-height-medium);
        letter-spacing: var(--letter-spacing-medium);
      }
    }

    :host([size='small']) {
      .title {
        font-size: var(--font-size-small);
        line-height: var(--line-height-small);
        letter-spacing: var(--letter-spacing-small);
      }
    }
  `;
}
