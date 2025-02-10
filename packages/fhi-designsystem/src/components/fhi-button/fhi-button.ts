import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiButtonSelector = 'fhi-button';

export type FhiButtonProps = Pick<
  FhiButton,
  'color' | 'variant' | 'disabled' | 'size'
>;

/**
 * Button component
 *
 * @tag fhi-button
 *
 * @slot contains the content of the button
 *
 */
@customElement(FhiButtonSelector)
export class FhiButton extends LitElement {
  /**
   * Bestemmer fargen på knappen.
   * @default 'accent'
   */
  @property({ type: String, reflect: true }) color:
    | 'accent'
    | 'neutral'
    | 'danger' = 'accent';

  /**
   * Bestemmer varianten av knappen.
   * @default 'strong'
   */
  @property({ type: String, reflect: true }) variant:
    | 'strong'
    | 'subtle'
    | 'outlined'
    | 'text' = 'strong';

  /**
   * Bestemmer størrelsen på knappen.
   * @default 'medium'
   */
  @property({ type: String, reflect: true }) size?:
    | 'large'
    | 'medium'
    | 'small' = 'medium';

  /**
   * Bestemmer om knappen er tilgjengelig.
   * @deafult false
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  render() {
    return html`<button ?disabled=${this.disabled}>
      <slot></slot>
    </button>`;
  }

  static styles = css`
    :host {
      button {
        border-radius: var(--fhi-border-radius-full);
        border: var(--fhi-border-width);
        font-family: var(--fhi-font-family-roboto-flex);

        display: inline-flex;
        justify-content: center;
        align-items: center;
        transition-duration: var(--fhi-duration-quick);
        transition-timing-function: cubic-bezier(var(--fhi-ease-default));

        cursor: pointer;
        &:disabled {
          opacity: var(--fhi-opacity-disabled);
          cursor: not-allowed;
        }
      }
    }

    :host([size='large']) button {
      font-size: var(--fhi-typography-label-large-font-size);
      font-weight: var(--fhi-typography-label-large-font-weight);
      line-height: var(--fhi-typography-label-large-line-height);
      letter-spacing: var(--fhi-typography-label-large-letter-spacing);

      padding-top: var(--fhi-spacing-200);
      padding-right: var(--fhi-spacing-300);
      padding-bottom: var(--fhi-spacing-200);
      padding-left: var(--fhi-spacing-300);
      gap: var(--fhi-spacing-100);
    }

    :host([size='medium']) button {
      font-size: var(--fhi-typography-label-medium-font-size);
      font-weight: var(--fhi-typography-label-medium-font-weight);
      line-height: var(--fhi-typography-label-medium-line-height);
      letter-spacing: var(--fhi-typography-label-medium-letter-spacing);

      padding-top: var(--fhi-spacing-100);
      padding-right: var(--fhi-spacing-200);
      padding-bottom: var(--fhi-spacing-100);
      padding-left: var(--fhi-spacing-200);
      gap: var(--fhi-spacing-050);
    }

    :host([size='small']) button {
      font-size: var(--fhi-tyopgraphy-label-medium-font-size);
      font-weight: var(--fhi-typography-label-medium-font-weight);
      line-height: var(--fhi-typography-label-medium-line-height);
      letter-spacing: var(--fhi-typography-label-medium-letter-spacing);

      padding-top: var(--fhi-spacing-050);
      padding-right: var(--fhi-spacing-150);
      padding-bottom: var(--fhi-spacing-050);
      padding-left: var(--fhi-spacing-150);
    }

    :host([color='accent'][variant='strong']) button {
      background-color: var(--fhi-color-accent-base);
      border-color: var(--fhi-color-accent-base);
      color: var(--fhi-color-accent-text-inverted);
      &:hover {
        background-color: var(--fhi-color-accent-base-hover);
        border-color: var(--fhi-color-accent-base-hover);
      }
      &:active {
        background-color: var(--fhi-color-accent-base-active);
        border-color: var(--fhi-color-accent-base-active);
      }
      &:disabled {
        background-color: var(--fhi-color-accent-base);
        border-color: var(--fhi-color-accent-base);
        color: var(--fhi-color-accent-text-inverted);
      }
    }

    :host([color='accent'][variant='subtle']) button {
      background-color: var(--fhi-color-accent-surface);
      border-color: var(--fhi-color-accent-surface);
      color: var(--fhi-color-accent-text-subtle);
      &:hover {
        background-color: var(--fhi-color-accent-surface-hover);
        border-color: var(--fhi-color-accent-surface-hover);
      }
      &:active {
        background-color: var(--fhi-color-accent-surface-active);
        border-color: var(--fhi-color-accent-surface-active);
      }
      &:disabled {
        background-color: var(--fhi-color-accent-surface);
        border-color: var(--fhi-color-accent-surface);
      }
    }

    :host([color='accent'][variant='outlined']) button {
      border-color: var(--fhi-color-accent-border);
      color: var(--fhi-color-accent-text-subtle);
      background-color: transparent;
      &:hover {
        background-color: var(--fhi-color-accent-surface);
        border-color: var(--fhi-color-accent-surface);
      }
      &:active {
        background-color: var(--fhi-color-accent-surface-hover);
        border-color: var(--fhi-color-accent-surface-hover);
      }
      &:disabled {
        border-color: var(--fhi-color-accent-border);
        background-color: transparent;
      }
    }

    :host([color='accent'][variant='text']) button {
      background-color: transparent;
      border-color: transparent;
      color: var(--fhi-color-accent-text-subtle);
      &:hover {
        background-color: var(--fhi-color-accent-surface);
        border-color: var(--fhi-color-accent-surface);
        color: var(--fhi-color-accent-text);
      }
      &:active {
        background-color: var(--fhi-color-accent-surface-hover);
        border-color: var(--fhi-color-accent-surface-hover);
        color: var(--fhi-color-accent-text);
      }
      &:disabled {
        background-color: transparent;
        color: var(--fhi-color-accent-text-subtle);
      }
    }

    :host([color='neutral'][variant='strong']) button {
      background-color: var(--fhi-color-neutral-base);
      border-color: var(--fhi-color-neutral-base);
      color: var(--fhi-color-neutral-text-inverted);
      &:hover {
        background-color: var(--fhi-color-neutral-base-hover);
        border-color: var(--fhi-color-neutral-base-hover);
        color: var(--fhi-color-neutral-text-inverted);
      }
      &:active {
        background-color: var(--fhi-color-neutral-base-active);
        border-color: var(--fhi-color-neutral-base-active);
        color: var(--fhi-color-neutral-text-inverted);
      }
      &:disabled {
        background-color: var(--fhi-color-neutral-base);
        border-color: var(--fhi-color-neutral-base);
        color: var(--fhi-color-neutral-text-inverted);
      }
    }

    :host([color='neutral'][variant='subtle']) button {
      background-color: var(--fhi-color-neutral-surface);
      border-color: var(--fhi-color-neutral-surface);
      color: var(--fhi-color-neutral-text-subtle);
      &:hover {
        background-color: var(--fhi-color-neutral-surface-hover);
        border-color: var(--fhi-color-neutral-surface-hover);
        color: var(--fhi-color-neutral-text);
      }
      &:active {
        background-color: var(--fhi-color-neutral-surface-active);
        border-color: var(--fhi-color-neutral-surface-active);
        color: var(--fhi-color-neutral-text);
      }
      &:disabled {
        background-color: var(--fhi-color-neutral-surface);
        border-color: var(--fhi-color-neutral-surface);
        color: var(--fhi-color-neutral-text);
      }
    }

    :host([color='neutral'][variant='outlined']) button {
      border-color: var(--fhi-color-neutral-border);
      color: var(--fhi-color-neutral-text-subtle);
      background-color: transparent;
      &:hover {
        background-color: var(--fhi-color-neutral-surface);
        border-color: var(--fhi-color-neutral-surface);
        color: var(--fhi-color-neutral-text);
      }
      &:active {
        background-color: var(--fhi-color-neutral-surface-hover);
        border-color: var(--fhi-color-neutral-surface-hover);
        color: var(--fhi-color-neutral-text);
      }
      &:disabled {
        border-color: var(--fhi-color-neutral-border);
        color: var(--fhi-color-neutral-text-subtle);
        background-color: transparent;
      }
    }

    :host([color='neutral'][variant='text']) button {
      background-color: transparent;
      border-color: transparent;
      color: var(--fhi-color-neutral-text-subtle);
      &:hover {
        background-color: var(--fhi-color-neutral-surface);
        border-color: var(--fhi-color-neutral-surface);
        color: var(--fhi-color-neutral-text);
      }
      &:active {
        background-color: var(--fhi-color-neutral-surface-hover);
        border-color: var(--fhi-color-neutral-surface-hover);
        color: var(--fhi-color-neutral-text);
      }
      &:disabled {
        background-color: transparent;
        border-color: transparent;
        color: var(--fhi-color-neutral-text-subtle);
      }
    }

    :host([color='danger'][variant='strong']) button {
      background-color: var(--fhi-color-danger-base);
      border-color: var(--fhi-color-danger-base);
      color: var(--fhi-color-danger-text-inverted);
      &:hover {
        background-color: var(--fhi-color-danger-base-hover);
        border-color: var(--fhi-color-danger-base-hover);
      }
      &:active {
        background-color: var(--fhi-color-danger-base-active);
        border-color: var(--fhi-color-danger-base-active);
      }
      &:disabled {
        background-color: var(--fhi-color-danger-base);
        border-color: var(--fhi-color-danger-base);
      }
    }

    :host([color='danger'][variant='subtle']) button {
      background-color: var(--fhi-color-danger-surface);
      border-color: var(--fhi-color-danger-surface);
      color: var(--fhi-color-danger-text-subtle);
      &:hover {
        background-color: var(--fhi-color-danger-surface-hover);
        border-color: var(--fhi-color-danger-surface-hover);
        color: var(--fhi-color-danger-text);
      }
      &:active {
        background-color: var(--fhi-color-danger-surface-active);
        border-color: var(--fhi-color-danger-surface-active);
        color: var(--fhi-color-danger-text);
      }
      &:disabled {
        background-color: var(--fhi-color-danger-surface);
        border-color: var(--fhi-color-danger-surface);
        color: var(--fhi-color-danger-text);
      }
    }

    :host([color='danger'][variant='outlined']) button {
      border-color: var(--fhi-color-danger-border);
      color: var(--fhi-color-danger-text-subtle);
      background-color: transparent;
      &:hover {
        background-color: var(--fhi-color-danger-surface);
        border-color: var(--fhi-color-danger-surface);
        color: var(--fhi-color-danger-text);
      }
      &:active {
        background-color: var(--fhi-color-danger-surface-hover);
        border-color: var(--fhi-color-danger-surface-hover);
        color: var(--fhi-color-danger-text);
      }
      &:disabled {
        border-color: var(--fhi-color-danger-border);
        color: var(--fhi-color-danger-text);
        background-color: transparent;
      }
    }

    :host([color='danger'][variant='text']) button {
      background-color: transparent;
      border-color: transparent;
      color: var(--fhi-color-danger-text-subtle);
      &:hover {
        background-color: var(--fhi-color-danger-surface);
        border-color: var(--fhi-color-danger-surface);
        color: var(--fhi-color-danger-text);
      }
      &:active {
        background-color: var(--fhi-color-danger-surface-hover);
        border-color: var(--fhi-color-danger-surface-hover);
        color: var(--fhi-color-danger-text);
      }
      &:disabled {
        background-color: transparent;
        border-color: transparent;
        color: var(--fhi-color-danger-text-subtle);
      }
    }
  `;
}
