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
      }
    }

    :host([color='accent'][variant='strong']) {
      button {
        background-color: var(--color-accent-base);
        &:hover {
          background-color: var(--color-accent-base-hover);
        }
        &:active {
          background-color: var(--color-accent-base-active);
        }
        &:disabled {
          background-color: var(--color-accent-base);
          //change opacity to token
          opacity: 60%;
        }
      }
    }

    :host([color='accent'][variant='subtle']) {
      button {
        background-color: var(--color-accent-surface);
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
        background-color: transparent;

        &:hover {
          background-color: var(--color-accent-surface);
        }
        &:active {
          background-color: var(--color-accent-surface-active);
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
        border-color: transparent;
        &:hover {
          background-color: var(--color-accent-surface);
        }
        &:active {
          background-color: var(--color-accent-surface-hover);
        }
        /* &:disabled {
        } */
      }
    }

    // Color=neutral
    :host([color='neutral'][variant='strong']) {
      button {
        background-color: var(--color-neutral-base);
        &:hover {
          background-color: var(--color-neutral-base-hover);
        }
        &:active {
          background-color: var(--color-neutral-base-active);
        }
        &:disabled {
          background-color: var(--color-neutral-base);
          //change to token
          opacity: 60%;
        }
      }
    }

    :host([color='neutral'][variant='subtle']) {
      button {
        background-color: var(--color-neutral-surface);
        &:hover {
          background-color: var(--color-neutral-surface-hover);
        }
        &:active {
          background-color: var(--color-neutral-surface-active);
        }
        &:disabled {
          background-color: var(--color-neutral-surface);
        }
      }
    }

    :host([color='neutral'][variant='outlined']) {
      button {
        background-color: transparent;
        border-color: var(--color-neutral-border);
        &:hover {
          background-color: var(--color-neutral-surface);
        }
        &:active {
          background-color: var(--color-neutral-surface-hover);
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
        &:hover {
          background-color: var(--color-neutral-surface);
        }
        &:active {
          background-color: var(--color-neutral-surface-hover);
        }
        &:disabled {
          opacity: 60%;
        }
      }
    }

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
        &:hover {
          background-color: var(--color-danger-surface-hover);
        }
        &:active {
          background-color: var(--color-danger-surface-active);
        }
        &:disabled {
          background-color: var(--color-danger-surface);
        }
      }
    }

    :host([color='danger'][variant='outlined']) {
      button {
        border-color: var(--color-danger-border);
        background-color: transparent;
        &:hover {
          background-color: var(--color-danger-surface);
        }
        &:active {
          background-color: var(--color-danger-surface);
        }
        &:disabled {
          border-color: var(--color-danger-border);
          // opacity
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
