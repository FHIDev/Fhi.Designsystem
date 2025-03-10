import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export const FhiButtonSelector = 'fhi-button';

@customElement(FhiButtonSelector)
export class FhiButton extends LitElement {
  @property({ type: String, reflect: true }) color:
    | 'accent'
    | 'neutral'
    | 'danger' = 'accent';

  @property({ type: String, reflect: true }) variant:
    | 'strong'
    | 'subtle'
    | 'outlined'
    | 'text' = 'strong';

  @property({ type: String, reflect: true }) size?:
    | 'large'
    | 'medium'
    | 'small' = 'medium';

  @property({ type: Boolean, reflect: true }) disabled = false;

  @property({ type: String }) type?: 'button' | 'submit' | 'reset';

  private _formButton!: HTMLButtonElement;
  private _form!: HTMLFormElement | null;

  constructor() {
    super();
    this._stopClickLeak = this._stopClickLeak.bind(this);
  }

  override connectedCallback(): void {
    if (!!super.connectedCallback) {
      super.connectedCallback();
    }

    this._form = this.closest('form');
  }

  protected override firstUpdated(): void {
    this._formButton = document.createElement('button');
    this._formButton.addEventListener('click', this._stopClickLeak);
    this.addEventListener('click', this._handleClick);
  }

  private _handleClick(event: MouseEvent): void {
    if (
      (this.type === 'submit' || this.type === 'reset') &&
      this._form &&
      !event.defaultPrevented
    ) {
      this._formButton.type = this.type;
      this._form?.appendChild(this._formButton);
      this._formButton.click();
      this._form?.removeChild(this._formButton);
    }
  }

  private _stopClickLeak(event: MouseEvent): void {
    if (event.target === this._formButton) {
      event.stopImmediatePropagation();
    }
  }

  render() {
    return html`<button ?disabled=${this.disabled} type=${ifDefined(this.type)}>
      <slot></slot>
    </button>`;
  }

  static styles = css`
    :host {
      --border-radius: var(--fhi-border-radius-full);
      --font-family: var(--fhi-font-family-roboto-flex);
      --transition: var(--fhi-duration-quick)
        cubic-bezier(var(--fhi-ease-default));

      --typography-label-large-letter-spacing: var(
        --fhi-typography-label-large-letter-spacing
      );
      --typography-label-medium-letter-spacing: var(
        --fhi-typography-label-medium-letter-spacing
      );
      --typography-label-small-letter-spacing: var(
        --fhi-typography-label-small-letter-spacing
      );
      --typography-label-large-line-height: var(
        --fhi-typography-label-large-line-height
      );
      --typography-label-medium-line-height: var(
        --fhi-typography-label-medium-line-height
      );
      --typography-label-small-line-height: var(
        --fhi-typography-label-medium-line-height
      );

      --padding-large: var(--fhi-spacing-200) var(--fhi-spacing-300)
        var(--fhi-spacing-200) var(--fhi-spacing-300);
      --padding-medium: var(--fhi-spacing-100) var(--fhi-spacing-200)
        var(--fhi-spacing-100) var(--fhi-spacing-200);
      --padding-small: var(--fhi-spacing-050) var(--fhi-spacing-150)
        var(--fhi-spacing-050) var(--fhi-spacing-150);

      --accent-strong-background-color: var(--fhi-color-accent-base);
      --accent-strong-border-color: var(--fhi-color-accent-base);
      --accent-strong-color: var(--fhi-color-accent-text-inverted);
      --accent-strong-background-color-hover: var(
        --fhi-color-accent-base-hover
      );
      --accent-strong-border-color-hover: var(--fhi-color-accent-base-hover);
      --accent-strong-background-color-active: var(
        --fhi-color-accent-base-active
      );

      --accent-strong-border-color-active: var(--fhi-color-accent-base-hover);
      --accent-strong-background-color-disabled: var(--fhi-color-accent-base);
      --accent-strong-border-color-disabled: var(--fhi-color-accent-base);

      --accent-subtle-background-color: var(--fhi-color-accent-surface);
      --accent-subtle-border-color: var(--fhi-color-accent-surface);
      --accent-subtle-color: var(--fhi-color-accent-text-subtle);
      --accent-subtle-background-color-hover: var(
        --fhi-color-accent-surface-hover
      );
      --accent-subtle-border-color-hover: var(--fhi-color-accent-surface-hover);
      --accent-subtle-background-color-active: var(
        --fhi-color-accent-surface-active
      );
      --accent-subtle-border-color-active: var(
        --fhi-color-accent-surface-active
      );
      --accent-subtle-background-color-disabled: var(
        --fhi-color-accent-surface
      );
      --accent-subtle-border-color-disabled: var(--fhi-color-accent-surface);

      --accent-outlined-background-color: transparent;
      --accent-outlined-border-color: var(--fhi-color-accent-border);
      --accent-outlined-color: var(--fhi-color-accent-text-subtle);
      --accent-outlined-background-color-hover: var(--fhi-color-accent-surface);
      --accent-outlined-border-color-hover: var(--fhi-color-accent-surface);
      --accent-outlined-background-color-active: var(
        --fhi-color-accent-surface-hover
      );
      --accent-outlined-border-color-active: var(
        --fhi-color-accent-surface-hover
      );
      --accent-outlined-background-color-disabled: transparent;
      --accent-outlined-border-color-disabled: var(--fhi-color-surface-base);

      --accent-text-background-color: transparent;
      --accent-text-border-color: transparent;
      --accent-text-color: var(--fhi-color-accent-text-subtle);
      --accent-text-background-color-hover: var(--fhi-color-accent-surface);
      --accent-text-border-color-hover: var(--fhi-color-accent-surface);
      --accent-text-color-hover: var(--fhi-color-accent-text);
      --accent-text-background-color-active: var(
        --fhi-color-accent-surface-hover
      );
      --accent-text-border-color-active: var(--fhi-color-accent-surface-hover);
      --accent-text-background-color-disabled: transparent;
      --accent-text-border-color-disabled: transparent;
      --accent-text-color-disabled: var(--fhi-color-accent-text);

      --neutral-strong-background-color: var(--fhi-color-neutral-base);
      --neutral-strong-border-color: var(--fhi-color-neutral-base);
      --neutral-strong-color: var(--fhi-color-neutral-text-inverted);
      --neutral-strong-background-color-hover: var(
        --fhi-color-neutral-base-hover
      );
      --neutral-strong-border-color-hover: var(--fhi-color-neutral-base-hover);
      --neutral-strong-background-color-active: var(
        --fhi-color-neutral-base-active
      );
      --neutral-strong-border-color-active: var(--fhi-color-neutral-base-hover);
      --neutral-strong-background-color-disabled: var(--fhi-color-neutral-base);
      --neutral-strong-border-color-disabled: var(--fhi-color-neutral-base);

      --neutral-subtle-background-color: var(--fhi-color-neutral-surface);
      --neutral-subtle-border-color: var(--fhi-color-neutral-surface);
      --neutral-subtle-color: var(--fhi-color-neutral-text-subtle);
      --neutral-subtle-background-color-hover: var(
        --fhi-color-neutral-surface-hover
      );
      --neutral-subtle-border-color-hover: var(
        --fhi-color-neutral-surface-hover
      );
      --neutral-subtle-background-color-active: var(
        --fhi-color-neutral-surface-active
      );
      --neutral-subtle-border-color-active: var(
        --fhi-color-neutral-surface-active
      );
      --neutral-subtle-background-color-disabled: var(
        --fhi-color-neutral-surface
      );
      --neutral-subtle-border-color-disabled: var(--fhi-color-neutral-surface);

      --neutral-outlined-background-color: transparent;
      --neutral-outlined-border-color: var(--fhi-color-neutral-border);
      --neutral-outlined-color: var(--fhi-color-neutral-text-subtle);
      --neutral-outlined-background-color-hover: var(
        --fhi-color-neutral-surface
      );
      --neutral-outlined-border-color-hover: var(--fhi-color-neutral-surface);
      --neutral-outlined-background-color-active: var(
        --fhi-color-neutral-surface-hover
      );
      --neutral-outlined-border-color-active: var(
        --fhi-color-neutral-surface-hover
      );
      --neutral-outlined-background-color-disabled: transparent;
      --neutral-outlined-border-color-disabled: var(--fhi-color-surface-base);

      --neutral-text-background-color: transparent;
      --neutral-text-border-color: transparent;
      --neutral-text-color: var(--fhi-color-neutral-text-subtle);
      --neutral-text-background-color-hover: var(--fhi-color-neutral-surface);
      --neutral-text-border-color-hover: var(--fhi-color-neutral-surface);
      --neutral-text-color-hover: var(--fhi-color-neutral-text);
      --neutral-text-background-color-active: var(
        --fhi-color-neutral-surface-hover
      );
      --neutral-text-border-color-active: var(
        --fhi-color-neutral-surface-hover
      );
      --neutral-text-color-active: var(--fhi-color-neutral-text);
      --neutral-text-background-color-disabled: transparent;
      --neutral-text-border-color-disabled: transparent;

      --danger-strong-background-color: var(--fhi-color-danger-base);
      --danger-strong-border-color: var(--fhi-color-danger-base);
      --danger-strong-color: var(--fhi-color-danger-text-inverted);
      --danger-strong-background-color-hover: var(
        --fhi-color-danger-base-hover
      );
      --danger-strong-border-color-hover: var(--fhi-color-danger-base-hover);
      --danger-strong-background-color-active: var(
        --fhi-color-danger-base-active
      );
      --danger-strong-border-color-active: var(--fhi-color-danger-base-hover);
      --danger-strong-background-color-disabled: var(--fhi-color-danger-base);
      --danger-strong-border-color-disabled: var(--fhi-color-danger-base);

      --danger-subtle-background-color: var(--fhi-color-danger-surface);
      --danger-subtle-border-color: var(--fhi-color-danger-surface);
      --danger-subtle-color: var(--fhi-color-danger-text-subtle);
      --danger-subtle-background-color-hover: var(
        --fhi-color-danger-surface-hover
      );
      --danger-subtle-border-color-hover: var(--fhi-color-danger-surface-hover);
      --danger-subtle-background-color-active: var(
        --fhi-color-danger-surface-active
      );
      --danger-subtle-border-color-active: var(
        --fhi-color-danger-surface-active
      );
      --danger-subtle-background-color-disabled: var(
        --fhi-color-danger-surface
      );
      --danger-subtle-border-color-disabled: var(--fhi-color-danger-surface);

      --danger-outlined-background-color: transparent;
      --danger-outlined-border-color: var(--fhi-color-danger-border);
      --danger-outlined-color: var(--fhi-color-danger-text-subtle);
      --danger-outlined-background-color-hover: var(--fhi-color-danger-surface);
      --danger-outlined-border-color-hover: var(--fhi-color-danger-surface);
      --danger-outlined-background-color-active: var(
        --fhi-color-danger-surface-hover
      );
      --danger-outlined-border-color-active: var(
        --fhi-color-danger-surface-hover
      );
      --danger-outlined-background-color-disabled: transparent;
      --danger-outlined-border-color-disabled: var(--fhi-color-surface-base);

      --danger-text-background-color: transparent;
      --danger-text-border-color: transparent;
      --danger-text-color: var(--fhi-color-danger-text-subtle);
      --danger-text-background-color-hover: var(--fhi-color-danger-surface);
      --danger-text-border-color-hover: var(--fhi-color-danger-surface);
      --danger-text-color-hover: var(--fhi-color-danger-text);
      --danger-text-background-color-active: var(
        --fhi-color-danger-surface-hover
      );
      --danger-text-border-color-active: var(--fhi-color-danger-surface-hover);
      --danger-text-color-active: var(--fhi-color-danger-text);
      --danger-text-background-color-disabled: transparent;
      --danger-text-border-color-disabled: transparent;
      --danger-text-color-disabled: var(--fhi-color-danger-text-subtle);

      button {
        border-radius: var(--border-radius);
        border: solid var(--fhi-border-width);
        font-family: var(--font-family);

        display: inline-flex;
        justify-content: center;
        align-items: center;

        transition: var(--transition);

        cursor: pointer;
        &:disabled {
          opacity: var(--fhi-opacity-disabled);
          cursor: not-allowed;
        }
      }
    }

    :host([size='large']) button {
      font-size: var(--label-large-font-size);
      font-weight: var(--label-large-font-weight);
      line-height: var(--typography-label-large-line-height);
      letter-spacing: var(--typography-label-large-letter-spacing);

      padding: var(--padding-large);
      gap: var(--fhi-spacing-100);
    }

    :host([size='medium']) button {
      font-size: var(--label-medium-font-size);
      font-weight: var(--label-medium-font-weight);
      line-height: var(--typography-label-medium-line-height);
      letter-spacing: var(--typography-label-medium-letter-spacing);

      padding: var(--padding-medium);
      gap: var(--fhi-spacing-050);
    }

    :host([size='small']) button {
      font-size: var(--label-small-font-size);
      font-weight: var(--label-small-font-weight);
      line-height: var(--typography-label-small-line-height);
      letter-spacing: var(--typography-label-small-letter-spacing);
      padding: var(--padding-small);
      gap: var(--fhi-spacing-0);
    }

    :host([color='accent'][variant='strong']) button {
      background-color: var(--accent-strong-background-color);
      border-color: var(--accent-strong-border-color);
      color: var(--accent-strong-color);
      &:hover {
        background-color: var(--accent-strong-background-color-hover);
        border-color: var(--accent-strong-border-color-hover);
      }
      &:active {
        background-color: var(--accent-strong-background-color-active);
        border-color: var(--accent-strong-border-color-active);
      }
      &:disabled {
        background-color: var(--accent-strong-background-color-disabled);
        border-color: var(--accent-strong-border-color-disabled);
      }
    }

    :host([color='accent'][variant='subtle']) button {
      background-color: var(--accent-subtle-background-color);
      border-color: var(--accent-subtle-border-color);
      color: var(--accent-subtle-color);
      &:hover {
        background-color: var(--accent-subtle-background-color-hover);
        border-color: var(--accent-subtle-border-color-hover);
      }
      &:active {
        background-color: var(--accent-subtle-background-color-active);
        border-color: var(--accent-subtle-border-color-active);
      }
      &:disabled {
        background-color: var(--accent-subtle-background-color-disabled);
        border-color: var(--accent-subtle-border-color-disabled);
      }
    }

    :host([color='accent'][variant='outlined']) button {
      background-color: var(--accent-outlined-background-colort);
      border-color: var(--accent-outlined-border-color);
      color: var(--accent-outlined-color);
      &:hover {
        background-color: var(--accent-outlined-background-color-hover);
        border-color: var(--accent-outlined-border-color-hover);
      }
      &:active {
        background-color: var(--accent-outlined-background-color-active);
        border-color: var(--accent-outlined-border-color-active);
      }
      &:disabled {
        background-color: var(--accent-outlined-background-color-disabled);
        border-color: var(--accent-outlined-border-color-disabled);
      }
    }

    :host([color='accent'][variant='text']) button {
      background-color: var(--accent-text-background-color);
      border-color: var(--accent-text-border-color);
      color: var(--accent-text-color);
      &:hover {
        background-color: var(--accent-text-background-color-hover);
        border-color: var(--accent-text-border-color-hover);
        color: var(--accent-text-color-hover);
      }
      &:active {
        background-color: var(--accent-text-background-color-active);
        border-color: var(--accent-text-border-color-active);
        color: var(--accent-text-color-active);
      }
      &:disabled {
        background-color: var(--accent-text-background-color-disabled);
        border-color: var(--accent-text-border-color-disabled);
        color: var(--accent-text-color-disabled);
      }
    }

    :host([color='neutral'][variant='strong']) button {
      background-color: var(--neutral-strong-background-color);
      border-color: var(--neutral-strong-border-color);
      color: var(--neutral-strong-color);
      &:hover {
        background-color: var(--neutral-strong-background-color-hover);
        border-color: var(--neutral-strong-border-color-hover);
      }
      &:active {
        background-color: var(--neutral-strong-background-color-active);
        border-color: var(--neutral-strong-border-color-active);
      }
      &:disabled {
        background-color: var(--neutral-strong-background-color-disabled);
        border-color: var(--neutral-strong-border-color-disabled);
      }
    }

    :host([color='neutral'][variant='subtle']) button {
      background-color: var(--neutral-subtle-background-color);
      border-color: var(--neutral-subtle-border-color);
      color: var(--neutral-subtle-color);
      &:hover {
        background-color: var(--neutral-subtle-background-color-hover);
        border-color: var(--neutral-subtle-border-color-hover);
      }
      &:active {
        background-color: var(--neutral-subtle-background-color-active);
        border-color: var(--neutral-subtle-border-color-active);
      }
      &:disabled {
        background-color: var(--neutral-subtle-background-color-disabled);
        border-color: var(--neutral-subtle-border-color-disabled);
      }
    }

    :host([color='neutral'][variant='outlined']) button {
      background-color: var(--neutral-outlined-background-colort);
      border-color: var(--neutral-outlined-border-color);
      color: var(--neutral-outlined-color);
      &:hover {
        background-color: var(--neutral-outlined-background-color-hover);
        border-color: var(--neutral-outlined-border-color-hover);
      }
      &:active {
        background-color: var(--neutral-outlined-background-color-active);
        border-color: var(--neutral-outlined-border-color-active);
      }
      &:disabled {
        background-color: var(--neutral-outlined-background-color-disabled);
        border-color: var(--neutral-outlined-border-color-disabled);
      }
    }

    :host([color='neutral'][variant='text']) button {
      background-color: var(--neutral-text-background-color);
      border-color: var(--neutral-text-border-color);
      color: var(--neutral-text-color);
      &:hover {
        background-color: var(--neutral-text-background-color-hover);
        border-color: var(--neutral-text-border-color-hover);
        color: var(--neutral-text-color-hover);
      }
      &:active {
        background-color: var(--neutral-text-background-color-active);
        border-color: var(--neutral-text-border-color-active);
        color: var(--neutral-text-color-active);
      }
      &:disabled {
        background-color: var(--neutral-text-background-color-disabled);
        border-color: var(--neutral-text-border-color-disabled);
        color: var(--neutral-text-color-disabled);
      }
    }

    :host([color='danger'][variant='strong']) button {
      background-color: var(--danger-strong-background-color);
      border-color: var(--danger-strong-border-color);
      color: var(--danger-strong-color);
      &:hover {
        background-color: var(--danger-strong-background-color-hover);
        border-color: var(--danger-strong-border-color-hover);
      }
      &:active {
        background-color: var(--danger-strong-background-color-active);
        border-color: var(--danger-strong-border-color-active);
      }
      &:disabled {
        background-color: var(--danger-strong-background-color-disabled);
        border-color: var(--danger-strong-border-color-disabled);
      }
    }

    :host([color='danger'][variant='subtle']) button {
      background-color: var(--danger-subtle-background-color);
      border-color: var(--danger-subtle-border-color);
      color: var(--danger-subtle-color);
      &:hover {
        background-color: var(--danger-subtle-background-color-hover);
        border-color: var(--danger-subtle-border-color-hover);
      }
      &:active {
        background-color: var(--danger-subtle-background-color-active);
        border-color: var(--danger-subtle-border-color-active);
      }
      &:disabled {
        background-color: var(--danger-subtle-background-color-disabled);
        border-color: var(--danger-subtle-border-color-disabled);
      }
    }

    :host([color='danger'][variant='outlined']) button {
      background-color: var(--danger-outlined-background-colort);
      border-color: var(--danger-outlined-border-color);
      color: var(--danger-outlined-color);
      &:hover {
        background-color: var(--danger-outlined-background-color-hover);
        border-color: var(--danger-outlined-border-color-hover);
      }
      &:active {
        background-color: var(--danger-outlined-background-color-active);
        border-color: var(--danger-outlined-border-color-active);
      }
      &:disabled {
        background-color: var(--danger-outlined-background-color-disabled);
        border-color: var(--danger-outlined-border-color-disabled);
      }
    }

    :host([color='danger'][variant='text']) button {
      background-color: var(--danger-text-background-color);
      border-color: var(--danger-text-border-color);
      color: var(--danger-text-color);
      &:hover {
        background-color: var(--danger-text-background-color-hover);
        border-color: var(--danger-text-border-color-hover);
        color: var(--danger-text-color-hover);
      }
      &:active {
        background-color: var(--danger-text-background-color-active);
        border-color: var(--danger-text-border-color-active);
        color: var(--danger-text-color-active);
      }
      &:disabled {
        background-color: var(--danger-text-background-color-disabled);
        border-color: var(--danger-text-border-color-disabled);
        color: var(--danger-text-color-disabled);
      }
    }
  `;
}
