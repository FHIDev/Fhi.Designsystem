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
        border-radius: 12px;
        padding: 10px;
        border-style: inset;
      }
    }

    :host([color='accent'][variant='strong']) {
      button {
        background-color: var(--color-accent-base);
        color: var(--color-accent-text-inverted);
        border-color: transparent;
        &:hover {
          background-color: var(--color-accent-base-hover);
        }
        &:active {
          background-color: var(--color-accent-base-active);
        }
        &:disabled {
          background-color: var(--color-accent-base);
          color: var(--color-accent-text-inverted);
          opacity: 0.6;
        }
      }
    }

    :host([color='accent'][variant='subtle']) {
      button {
        background-color: var(--color-accent-surface);
        color: var(--color-accent-text-subtle);
        border-color: transparent;
        &:hover {
          background-color: var(--color-accent-surface-hover);
        }
        &:active {
          background-color: var(--color-accent-surface-active);
        }
        &:disabled {
          background-color: var(--color-accent-surface);
          opacity: 0.6;
        }
      }
    }

    :host([color='accent'][variant='outlined']) {
      button {
        border: 1px solid var(--color-accent-border);
        color: var(--color-accent-text-subtle);
        background-color: transparent;
        &:hover {
          background-color: var(--color-accent-surface);
          border-color: transparent;
        }
        &:active {
          background-color: var(--color-accent-surface-active);
          border-color: transparent;
        }
        &:disabled {
          border-color: 1px solid var(--color-accent-border);
          background-color: transparent;
          opacity: 0.6;
        }
      }
    }

    :host([color='accent'][variant='text']) {
      button {
        background-color: transparent;
        color: var(--color-accent-text-subtle);
        border-color: transparent;
        &:hover {
          background-color: var(--color-accent-surface);
          color: var(--color-accent-text);
        }
        &:active {
          background-color: var(--color-accent-surface-hover);
          color: var(--color-accent-text);
        }
        &:disabled {
          background-color: transparent;
          color: var(--color-accent-text-subtle);
          opacity: 0.6;
        }
      }
    }

    :host([color='neutral'][variant='strong']) {
      button {
        background-color: var(--color-neutral-base);
        color: var(--color-neutral-text-inverted);
        border-color: transparent;
        &:hover {
          background-color: var(--color-neutral-base-hover);
          color: var(--color-neutral-text-inverted);
        }
        &:active {
          background-color: var(--color-neutral-base-active);
          color: var(--color-neutral-text-inverted);
        }
        &:disabled {
          background-color: var(--color-neutral-base);
          color: var(--color-neutral-text-inverted);
          opacity: 0.6;
        }
      }
    }

    :host([color='neutral'][variant='subtle']) {
      button {
        background-color: var(--color-neutral-surface);
        color: var(--color-neutral-text-subtle);
        border-color: transparent;
        &:hover {
          background-color: var(--color-neutral-surface-hover);
          color: var(--color-neutral-text);
        }
        &:active {
          background-color: var(--color-neutral-surface-active);
          color: var(--color-neutral-text);
        }
        &:disabled {
          background-color: var(--color-neutral-surface);
          color: var(--color-neutral-text);
          opacity: 0.6;
        }
      }
    }

    :host([color='neutral'][variant='outlined']) {
      button {
        border: 1px solid var(--color-neutral-border);
        color: var(--color-neutral-text-subtle);
        background-color: transparent;
        &:hover {
          background-color: var(--color-neutral-surface);
          color: var(--color-neutral-text);
          border-color: transparent;
        }
        &:active {
          background-color: var(--color-neutral-surface-hover);
          color: var(--color-neutral-text);
          border-color: transparent;
        }
        &:disabled {
          border: 1px solid var(--color-neutral-border);
          color: var(--color-neutral-text-subtle);
          background-color: transparent;
          opacity: 0.6;
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
          color: var(--color-neutral-text);
        }
        &:active {
          background-color: var(--color-neutral-surface-hover);
          color: var(--color-neutral-text);
        }
        &:disabled {
          background-color: transparent;
          color: var(--color-neutral-text-subtle);
          opacity: 0.6;
        }
      }
    }

    :host([color='danger'][variant='strong']) {
      button {
        background-color: var(--color-danger-base);
        color: var(--color-danger-text-inverted);
        border-color: transparent;
        &:hover {
          background-color: var(--color-danger-base-hover);
        }
        &:active {
          background-color: var(--color-danger-base-active);
        }
        &:disabled {
          background-color: var(--color-danger-base);
          opacity: 0.6;
        }
      }
    }

    :host([color='danger'][variant='subtle']) {
      button {
        background-color: var(--color-danger-surface);
        color: var(--color-danger-text-subtle);
        border-color: transparent;
        &:hover {
          background-color: var(--color-danger-surface-hover);
          color: var(--color-danger-text);
        }
        &:active {
          background-color: var(--color-danger-surface-active);
          color: var(--color-danger-text);
        }
        &:disabled {
          background-color: var(--color-danger-surface);
          color: var(--color-danger-text);
          opacity: 0.6;
        }
      }
    }

    :host([color='danger'][variant='outlined']) {
      button {
        border: 1px solid var(--color-danger-border);
        color: var(--color-danger-text-subtle);
        background-color: transparent;
        &:hover {
          background-color: var(--color-danger-surface);
          color: var(--color-danger-text);
          border-color: transparent;
        }
        &:active {
          background-color: var(--color-danger-surface-hover);
          color: var(--color-danger-text);
          border-color: transparent;
        }
        &:disabled {
          border-color: var(--color-danger-border);
          color: var(--color-danger-text);
          background-color: transparent;
          opacity: 0.6;
        }
      }
    }
    :host([color='danger'][variant='text']) {
      button {
        background-color: transparent;
        color: var(--color-danger-text-subtle);
        border-color: transparent;
        &:hover {
          background-color: var(--color-danger-surface);
          color: var(--color-danger-text);
        }
        &:active {
          background-color: var(--color-danger-surface-active);
          color: var(--color-danger-text);
        }
        &:disabled {
          background-color: transparent;
          color: var(--color-danger-text-subtle);
          opacity: 0.6;
        }
      }
    }
  `;
}

/* 
:host([color=''][variant='']) {
button {

&:hover {
  background-color: var();
}
&:active {
  background-color: var();
}
&:disabled {
  background-color: var();
}
}
}
 */
