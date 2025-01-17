import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiButtonSelector = 'fhi-button';

export type FhiButtonProps = Pick<
  FhiButton,
  'color' | 'variant' | 'inactive' | 'size'
>;

@customElement(FhiButtonSelector)
export class FhiButton extends LitElement {
  @property({ type: String }) color?: 'accent' | 'neutral' | 'danger';
  @property({ type: String }) variant?:
    | 'strong'
    | 'subtle'
    | 'outlined'
    | 'text';
  @property({ type: Boolean }) inactive?: boolean;
  @property({ type: String }) size?: 'large' | 'medium' | 'small';

  render() {
    return html`<button ?disabled=${this.inactive}><slot></slot></button>`;
  }

  static styles = css`
    :host {
      button {
        border-radius: 12px;
        padding: 10px;
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
          //change opacity to token
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
          // change opacity
          opacity: 60%;
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
          border-color: transparent;
        }
        &:active {
          background-color: var(--color-accent-surface-active);
          border-color: transparent;
        }
        &:disabled {
          border-color: var(--color-accent-border);
          // add opacity
          opacity: 60%;
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
        }
        &:active {
          background-color: var(--color-accent-surface-hover);
        }
        &:disabled {
          opacity: 60%;
        }
      }
    }

    // Color=neutral
    :host([color='neutral'][variant='strong']) {
      button {
        background-color: var(--color-neutral-base);
        color: var(--color-neutral-text-subtle);
        border-color: transparent;
        &:hover {
          background-color: var(--color-neutral-base-hover);
          color: var(--color-neutral-text);
        }
        &:active {
          background-color: var(--color-neutral-base-active);
          color: var(--color-neutral-text);
        }
        &:disabled {
          background-color: var(--color-neutral-base);
          color: var(--color-neutral-text);
          // opacity
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
          color: var(--color-neutral-text);
          border-color: transparent;
        }
        &:active {
          background-color: var(--color-neutral-surface-hover);
          color: var(--color-neutral-text);
          border-color: transparent;
        }
        &:disabled {
          opacity: 60%;
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
          opacity: 60%;
        }
      }
    }

    // danger
    :host([color='danger'][variant='strong']) {
      button {
        background-color: var(--color-danger-base);
        &:hover {
          background-color: var(--color-danger-base-hover);
        }
        &:active {
          background-color: var(--color-danger-base-active);
        }
        &:disabled {
          background-color: var(--color-danger-base);
          // opacity
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
        border-color: var(--color-danger-border);
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
          // opacity
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
