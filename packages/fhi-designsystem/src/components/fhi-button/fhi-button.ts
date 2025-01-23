import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiButtonSelector = 'fhi-button';

export type FhiButtonProps = Pick<
  FhiButton,
  'color' | 'variant' | 'disabled' | 'size'
>;

@customElement(FhiButtonSelector)
export class FhiButton extends LitElement {
  @property({ type: String }) color?: 'accent' | 'neutral' | 'danger';
  @property({ type: String }) variant?:
    | 'strong'
    | 'subtle'
    | 'outlined'
    | 'text';
  @property({ type: Boolean }) disabled?: boolean;
  @property({ type: String }) size?: 'large' | 'medium' | 'small';

  render() {
    return html`<button ?disabled=${this.disabled}><slot></slot></button>`;
  }

  static styles = css`
    :host {
      button {
        border-radius: var(--border-radius-full);
        padding: 10px;
        border-style: inset;
        border: 1px solid;
        font-family: var(--font-family-roboto-flex);

        display: inline-flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;
        &:hover {
          opacity: 0.6;
        }
      }
    }

    :host([size='large']) {
      button {
        font-size: var(--typography-label-large-font-size);
        font-weight: var(--typography-label-large-font-weight);
        line-height: var(--typography-label-large-line-height);
        letter-spacing: var(--typography-label-large-letter-spacing);

        padding-top: var(--spacing-200);
        padding-right: var(--spacing-300);
        padding-bottom: var(--spacing-200);
        padding-left: var(--spacing-300);
        gap: var(--spacing-100);
      }
    }

    :host([size='medium']) {
      button {
        font-size: var(--typography-label-medium-font-size);
        font-weight: var(--typography-label-medium-font-weight);
        line-height: var(--typography-label-medium-line-height);
        letter-spacing: var(--typography-label-medium-letter-spacing);

        padding-top: var(--spacing-100);
        padding-right: var(--spacing-200);
        padding-bottom: var(--spacing-100);
        padding-left: var(--spacing-200);
        gap: var(--spacing-050);
      }
    }

    :host([size='small']) {
      button {
        font-size: var(--tyopgraphy-label-medium-font-size);
        font-weight: var(--typography-label-medium-font-weight);
        line-height: var(--typography-label-medium-line-height);
        letter-spacing: var(--typography-label-medium-letter-spacing);

        padding-top: var(--spacing-050);
        padding-right: var(--spacing-150);
        padding-bottom: var(--spacing-050);
        padding-left: var(--spacing-150);
      }
    }

    :host([color='accent'][variant='strong']) {
      button {
        background-color: var(--color-accent-base);
        border-color: var(--color-accent-base);
        color: var(--color-accent-text-inverted);
        &:hover {
          background-color: var(--color-accent-base-hover);
          border-color: var(--color-accent-base-hover);
        }
        &:active {
          background-color: var(--color-accent-base-active);
          border-color: var(--color-accent-base-active);
        }
        &:disabled {
          background-color: var(--color-accent-base);
          border-color: var(--color-accent-base);
          color: var(--color-accent-text-inverted);
        }
      }
    }

    :host([color='accent'][variant='subtle']) {
      button {
        background-color: var(--color-accent-surface);
        border-color: var(--color-accent-surface);
        color: var(--color-accent-text-subtle);
        &:hover {
          background-color: var(--color-accent-surface-hover);
          border-color: var(--color-accent-surface-hover);
        }
        &:active {
          background-color: var(--color-accent-surface-active);
          border-color: var(--color-accent-surface-active);
        }
        &:disabled {
          background-color: var(--color-accent-surface);
          border-color: var(--color-accent-surface);
        }
      }
    }

    :host([color='accent'][variant='outlined']) {
      button {
        border-color: var(--color-accent-border);
        color: var(--color-accent-text-subtle);
        background-color: transparent;
        &:hover {
          background-color: var(--color-accent-surface);
          border-color: var(--color-accent-surface);
        }
        &:active {
          background-color: var(--color-accent-surface-active);
          border-color: var(--color-accent-surface-active);
        }
        &:disabled {
          border-color: var(--color-accent-border);
          background-color: transparent;
        }
      }
    }

    :host([color='accent'][variant='text']) {
      button {
        background-color: transparent;
        border-color: transparent;
        color: var(--color-accent-text-subtle);
        &:hover {
          background-color: var(--color-accent-surface);
          border-color: var(--color-accent-surface);
          color: var(--color-accent-text);
        }
        &:active {
          background-color: var(--color-accent-surface-hover);
          border-color: var(--color-accent-surface-hover);
          color: var(--color-accent-text);
        }
        &:disabled {
          background-color: transparent;
          color: var(--color-accent-text-subtle);
        }
      }
    }

    :host([color='neutral'][variant='strong']) {
      button {
        background-color: var(--color-neutral-base);
        border-color: var(--color-neutral-base);
        color: var(--color-neutral-text-inverted);
        &:hover {
          background-color: var(--color-neutral-base-hover);
          border-color: var(--color-neutral-base-hover);
          color: var(--color-neutral-text-inverted);
        }
        &:active {
          background-color: var(--color-neutral-base-active);
          border-color: var(--color-neutral-base-active);
          color: var(--color-neutral-text-inverted);
        }
        &:disabled {
          background-color: var(--color-neutral-base);
          border-color: var(--color-neutral-base);
          color: var(--color-neutral-text-inverted);
        }
      }
    }

    :host([color='neutral'][variant='subtle']) {
      button {
        background-color: var(--color-neutral-surface);
        border-color: var(--color-neutral-surface);
        color: var(--color-neutral-text-subtle);
        &:hover {
          background-color: var(--color-neutral-surface-hover);
          border-color: var(--color-neutral-surface-hover);
          color: var(--color-neutral-text);
        }
        &:active {
          background-color: var(--color-neutral-surface-active);
          border-color: var(--color-neutral-surface-active);
          color: var(--color-neutral-text);
        }
        &:disabled {
          background-color: var(--color-neutral-surface);
          border-color: var(--color-neutral-surface);
          color: var(--color-neutral-text);
        }
      }
    }

    :host([color='neutral'][variant='outlined']) {
      button {
        border-color: var(--color-neutral-border);
        color: var(--color-neutral-text-subtle);
        background-color: transparent;
        &:hover {
          background-color: var(--color-neutral-surface);
          border-color: var(--color-neutral-surface);
          color: var(--color-neutral-text);
        }
        &:active {
          background-color: var(--color-neutral-surface-hover);
          border-color: var(--color-neutral-surface-hover);
          color: var(--color-neutral-text);
        }
        &:disabled {
          border-color: var(--color-neutral-border);
          color: var(--color-neutral-text-subtle);
          background-color: transparent;
        }
      }
    }
    :host([color='neutral'][variant='text']) {
      button {
        background-color: transparent;
        border-color: transparent;
        color: var(--color-neutral-text-subtle);
        &:hover {
          background-color: var(--color-neutral-surface);
          border-color: var(--color-neutral-surface);
          color: var(--color-neutral-text);
        }
        &:active {
          background-color: var(--color-neutral-surface-hover);
          border-color: var(--color-neutral-surface-hover);
          color: var(--color-neutral-text);
        }
        &:disabled {
          background-color: transparent;
          border-color: transparent;
          color: var(--color-neutral-text-subtle);
        }
      }
    }

    :host([color='danger'][variant='strong']) {
      button {
        background-color: var(--color-danger-base);
        border-color: var(--color-danger-base);
        color: var(--color-danger-text-inverted);
        &:hover {
          background-color: var(--color-danger-base-hover);
          border-color: var(--color-danger-base-hover);
        }
        &:active {
          background-color: var(--color-danger-base-active);
          border-color: var(--color-danger-base-active);
        }
        &:disabled {
          background-color: var(--color-danger-base);
          border-color: var(--color-danger-base);
        }
      }
    }

    :host([color='danger'][variant='subtle']) {
      button {
        background-color: var(--color-danger-surface);
        border-color: var(--color-danger-surface);
        color: var(--color-danger-text-subtle);
        &:hover {
          background-color: var(--color-danger-surface-hover);
          border-color: var(--color-danger-surface-hover);
          color: var(--color-danger-text);
        }
        &:active {
          background-color: var(--color-danger-surface-active);
          border-color: var(--color-danger-surface-active);
          color: var(--color-danger-text);
        }
        &:disabled {
          background-color: var(--color-danger-surface);
          border-color: var(--color-danger-surface);
          color: var(--color-danger-text);
        }
      }
    }

    :host([color='danger'][variant='outlined']) {
      button {
        border-color: var(--color-danger-border);
        color: var(--color-danger-text-subtle);
        background-color: transparent;
        &:hover {
          background-color: var(--color-danger-surface);
          border-color: var(--color-danger-surface);
          color: var(--color-danger-text);
        }
        &:active {
          background-color: var(--color-danger-surface-hover);
          border-color: var(--color-danger-surface-hover);
          color: var(--color-danger-text);
        }
        &:disabled {
          border-color: var(--color-danger-border);
          color: var(--color-danger-text);
          background-color: transparent;
        }
      }
    }
    :host([color='danger'][variant='text']) {
      button {
        background-color: transparent;
        border-color: transparent;
        color: var(--color-danger-text-subtle);
        &:hover {
          background-color: var(--color-danger-surface);
          border-color: var(--color-danger-surface);
          color: var(--color-danger-text);
        }
        &:active {
          background-color: var(--color-danger-surface-active);
          border-color: var(--color-danger-surface-active);
          color: var(--color-danger-text);
        }
        &:disabled {
          background-color: transparent;
          border-color: transparent;
          color: var(--color-danger-text-subtle);
        }
      }
    }
  `;
}
