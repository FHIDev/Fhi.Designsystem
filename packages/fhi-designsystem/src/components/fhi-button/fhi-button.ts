import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

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

  @property({ type: String, reflect: true }) size:
    | 'large'
    | 'medium'
    | 'small' = 'medium';

  @property({ type: Boolean, reflect: true }) disabled = false;

  @property({ type: String }) type: 'button' | 'submit' | 'reset' = 'submit';

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
    return html`<button ?disabled=${this.disabled} type=${this.type}>
      <slot></slot>
    </button>`;
  }

  static styles = css`
    :host {
      --dimension-border-radius: var(--fhi-border-radius-full);
      --dimension-border-width: var(--fhi-dimension-border-width);
      --typography-font-family: var(--fhi-font-family-roboto-flex);
      --motion-transition: var(--fhi-motion-duration-quick)
        var(--fhi-motion-ease-default);

      --opacity-disabled: var(--fhi-opacity-disabled);

      --typography-label-font-size-large: var(
        --fhi-typography-label-large-font-size
      );
      --typography-label-font-size-medium: var(
        --fhi-typography-label-medium-font-size
      );
      --typography-label-font-size-small: var(
        --fhi-typography-label-small-font-size
      );
      --typography-label-font-weight-large: var(
        --fhi-typography-label-font-weight-large
      );
      --typography-label-font-weight-medium: var(
        --fhi-typography-label-medium-font-weight
      );
      --typography-label-font-weight-small: var(
        --fhi-typography-label-small-font-weight
      );
      --typography-label-letter-spacing-large: var(
        --fhi-typography-label-large-letter-spacing
      );
      --typography-label-letter-spacing-medium: var(
        --fhi-typography-label-medium-letter-spacing
      );
      --typography-label-letter-spacing-small: var(
        --fhi-typography-label-small-letter-spacing
      );
      --typography-label-line-height-large: var(
        --fhi-typography-label-large-line-height
      );
      --typography-label-line-height-medium: var(
        --fhi-typography-label-medium-line-height
      );
      --typography-label-line-height-small: var(
        --fhi-typography-label-medium-line-height
      );

      --dimension-padding-small: calc(
          var(--fhi-spacing-050) - var(--fhi-dimension-border-width)
        )
        var(--fhi-spacing-150);
      --dimension-padding-medium: calc(
          var(--fhi-spacing-100) - var(--fhi-dimension-border-width)
        )
        var(--fhi-spacing-200);
      --dimension-padding-large: calc(
          var(--fhi-spacing-200) - var(--fhi-dimension-border-width)
        )
        var(--fhi-spacing-300);
      --color-accent-strong-background: var(--fhi-color-accent-base);
      --color-accent-strong-border: var(--fhi-color-accent-base);
      --color-accent-strong: var(--fhi-color-accent-text-inverted);
      --color-accent-strong-background-hover: var(
        --fhi-color-accent-base-hover
      );
      --color-accent-strong-border-hover: var(--fhi-color-accent-base-hover);
      --color-accent-strong-hover: var(--fhi-color-accent-text-inverted);
      --color-accent-strong-background-active: var(
        --fhi-color-accent-base-active
      );
      --color-accent-strong-border-active: var(--fhi-color-accent-base-hover);
      --color-accent-strong-active: var(--fhi-color-accent-text-inverted);
      --color-accent-strong-background-disabled: var(--fhi-color-accent-base);
      --color-accent-strong-border-disabled: var(--fhi-color-accent-base);
      --color-accent-strong-disabled: var(--fhi-color-accent-text-inverted);

      --color-accent-subtle-background: var(--fhi-color-accent-surface);
      --color-accent-subtle-border: var(--fhi-color-accent-surface);
      --color-accent-subtle: var(--fhi-color-accent-text-subtle);
      --color-accent-subtle-background-hover: var(
        --fhi-color-accent-surface-hover
      );
      --color-accent-subtle-border-hover: var(--fhi-color-accent-surface-hover);
      --color-accent-subtle-hover: var(--fhi-color-accent-text);
      --color-accent-subtle-background-active: var(
        --fhi-color-accent-surface-active
      );
      --color-accent-subtle-border-active: var(
        --fhi-color-accent-surface-active
      );
      --color-accent-subtle-active: var(--fhi-color-accent-text);
      --color-accent-subtle-background-disabled: var(
        --fhi-color-accent-surface
      );
      --color-accent-subtle-border-disabled: var(--fhi-color-accent-surface);
      --color-accent-subtle-disabled: var(--fhi-color-accent-text-subtle);

      --color-accent-outlined-background: transparent;
      --color-accent-outlined-border: var(--fhi-color-accent-border);
      --color-accent-outlined: var(--fhi-color-accent-text-subtle);
      --color-accent-outlined-background-hover: var(--fhi-color-accent-surface);
      --color-accent-outlined-border-hover: var(--fhi-color-accent-surface);
      --color-accent-outlined-hover: var(--fhi-color-accent-text);
      --color-accent-outlined-background-active: var(
        --fhi-color-accent-surface-hover
      );
      --color-accent-outlined-border-active: var(
        --fhi-color-accent-surface-hover
      );
      --color-accent-outlined-active: var(--fhi-color-accent-text);
      --color-accent-outlined-background-disabled: transparent;
      --color-accent-outlined-border-disabled: var(--fhi-color-surface-base);
      --color-accent-outlined-disabled: var(--fhi-color-accent-text-subtle);

      --color-accent-text-background: transparent;
      --color-accent-text-border: transparent;
      --color-accent-text: var(--fhi-color-accent-text-subtle);
      --color-accent-text-background-hover: var(--fhi-color-accent-surface);
      --color-accent-text-border-hover: var(--fhi-color-accent-surface);
      --color-accent-text-hover: var(--fhi-color-accent-text);
      --color-accent-text-background-active: var(
        --fhi-color-accent-surface-hover
      );
      --color-accent-text-border-active: var(--fhi-color-accent-surface-hover);
      --color-accent-text-active: var(--fhi-color-accent-text);
      --color-accent-text-background-disabled: transparent;
      --color-accent-text-border-disabled: transparent;
      --color-accent-text-disabled: var(--fhi-color-accent-text);

      --color-neutral-strong-background: var(--fhi-color-neutral-base);
      --color-neutral-strong-border: var(--fhi-color-neutral-base);
      --color-neutral-strong: var(--fhi-color-neutral-text-inverted);
      --color-neutral-strong-background-hover: var(
        --fhi-color-neutral-base-hover
      );
      --color-neutral-strong-border-hover: var(--fhi-color-neutral-base-hover);
      --color-neutral-strong-hover: var(--fhi-color-neutral-text-inverted);
      --color-neutral-strong-background-active: var(
        --fhi-color-neutral-base-active
      );
      --color-neutral-strong-border-active: var(--fhi-color-neutral-base-hover);
      --color-neutral-strong-active: var(--fhi-color-neutral-text-inverted);
      --color-neutral-strong-background-disabled: var(--fhi-color-neutral-base);
      --color-neutral-strong-border-disabled: var(--fhi-color-neutral-base);
      --color-neutral-strong-disabled: var(--fhi-color-neutral-text-inverted);

      --color-neutral-subtle-background: var(--fhi-color-neutral-surface);
      --color-neutral-subtle-border: var(--fhi-color-neutral-surface);
      --color-neutral-subtle: var(--fhi-color-neutral-text-subtle);
      --color-neutral-subtle-background-hover: var(
        --fhi-color-neutral-surface-hover
      );
      --color-neutral-subtle-border-hover: var(
        --fhi-color-neutral-surface-hover
      );
      --color-neutral-subtle-hover: var(--fhi-color-neutral-text);
      --color-neutral-subtle-background-active: var(
        --fhi-color-neutral-surface-active
      );
      --color-neutral-subtle-border-active: var(
        --fhi-color-neutral-surface-active
      );
      --color-neutral-subtle-active: var(--fhi-color-neutral-text);
      --color-neutral-subtle-background-disabled: var(
        --fhi-color-neutral-surface
      );
      --color-neutral-subtle-border-disabled: var(--fhi-color-neutral-surface);
      --color-neutral-subtle-disabled: var(--fhi-color-neutral-text);

      --color-neutral-outlined-background: transparent;
      --color-neutral-outlined-border: var(--fhi-color-neutral-border);
      --color-neutral-outlined: var(--fhi-color-neutral-text-subtle);
      --color-neutral-outlined-background-hover: var(
        --fhi-color-neutral-surface
      );
      --color-neutral-outlined-border-hover: var(--fhi-color-neutral-surface);
      --color-neutral-outlined-hover: var(--fhi-color-neutral-text);
      --color-neutral-outlined-background-active: var(
        --fhi-color-neutral-surface-hover
      );
      --color-neutral-outlined-border-active: var(
        --fhi-color-neutral-surface-hover
      );
      --color-neutral-outlined-active: var(--fhi-color-neutral-text);
      --color-neutral-outlined-background-disabled: transparent;
      --color-neutral-outlined-border-disabled: var(--fhi-color-surface-base);
      --color-neutral-outlined-disabled: var(--fhi-color-neutral-text-subtle);

      --color-neutral-text-background: transparent;
      --color-neutral-text-border: transparent;
      --color-neutral-text: var(--fhi-color-neutral-text-subtle);
      --color-neutral-text-background-hover: var(--fhi-color-neutral-surface);
      --color-neutral-text-border-hover: var(--fhi-color-neutral-surface);
      --color-neutral-text-hover: var(--fhi-color-neutral-text);
      --color-neutral-text-background-active: var(
        --fhi-color-neutral-surface-hover
      );
      --color-neutral-text-border-active: var(
        --fhi-color-neutral-surface-hover
      );
      --color-neutral-text-active: var(--fhi-color-neutral-text);
      --color-neutral-text-background-disabled: transparent;
      --color-neutral-text-border-disabled: transparent;
      --color-neutral-text-disaabled: var(--fhi-color-neutral-text-subtle);

      --color-danger-strong-background: var(--fhi-color-danger-base);
      --color-danger-strong-border: var(--fhi-color-danger-base);
      --color-danger-strong: var(--fhi-color-danger-text-inverted);
      --color-danger-strong-background-hover: var(
        --fhi-color-danger-base-hover
      );
      --color-danger-strong-border-hover: var(--fhi-color-danger-base-hover);
      --color-danger-strong-hover: var(--fhi-color-danger-text-inverted);
      --color-danger-strong-background-active: var(
        --fhi-color-danger-base-active
      );
      --color-danger-strong-border-active: var(--fhi-color-danger-base-hover);
      --color-danger-strong-active: var(--fhi-color-danger-text-inverted);
      --color-danger-strong-background-disabled: var(--fhi-color-danger-base);
      --color-danger-strong-border-disabled: var(--fhi-color-danger-base);
      --color-danger-strong-disabled: var(--fhi-color-danger-text-inverted);

      --color-danger-subtle-background: var(--fhi-color-danger-surface);
      --color-danger-subtle-border: var(--fhi-color-danger-surface);
      --color-danger-subtle: var(--fhi-color-danger-text-subtle);
      --color-danger-subtle-background-hover: var(
        --fhi-color-danger-surface-hover
      );
      --color-danger-subtle-border-hover: var(--fhi-color-danger-surface-hover);
      --color-danger-subtle-hover: var(--fhi-color-danger-text);
      --color-danger-subtle-background-active: var(
        --fhi-color-danger-surface-active
      );
      --color-danger-subtle-border-active: var(
        --fhi-color-danger-surface-active
      );
      --color-danger-subtle-active: var(--fhi-color-danger-text);
      --color-danger-subtle-background-disabled: var(
        --fhi-color-danger-surface
      );
      --color-danger-subtle-border-disabled: var(--fhi-color-danger-surface);
      --color-danger-subtle-disabled: var(--fhi-color-danger-text-subtle);

      --color-danger-outlined-background-color: transparent;
      --color-danger-outlined-border: var(--fhi-color-danger-border);
      --color-danger-outlined: var(--fhi-color-danger-text-subtle);
      --color-danger-outlined-background-hover: var(--fhi-color-danger-surface);
      --color-danger-outlined-border-hover: var(--fhi-color-danger-surface);
      --color-danger-outlined-hover: var(--fhi-color-danger-text);
      --color-danger-outlined-background-active: var(
        --fhi-color-danger-surface-hover
      );
      --color-danger-outlined-border-active: var(
        --fhi-color-danger-surface-hover
      );
      --color-danger-outlined-active: var(--fhi-color-danger-text);
      --color-danger-outlined-background-disabled: transparent;
      --color-danger-outlined-border-disabled: var(--fhi-color-danger-border);
      --color-danger-outlined-disabled: var(--fhi-color-danger-text-subtle);

      --color-danger-text-background: transparent;
      --color-danger-text-border: transparent;
      --color-danger-text: var(--fhi-color-danger-text-subtle);
      --color-danger-text-background-hover: var(--fhi-color-danger-surface);
      --color-danger-text-border-hover: var(--fhi-color-danger-surface);
      --color-danger-text-hover: var(--fhi-color-danger-text);
      --color-danger-text-background-active: var(
        --fhi-color-danger-surface-hover
      );
      --color-danger-text-border-active: var(--fhi-color-danger-surface-hover);
      --color-danger-text-active: var(--fhi-color-danger-text);
      --color-danger-text-background-disabled: transparent;
      --color-danger-text-border-disabled: transparent;
      --color-danger-text-disabled: var(--fhi-color-danger-text-subtle);

      button {
        border-radius: var(--dimension-border-radius);
        border: solid var(--dimension-border-width);
        font-family: var(--typography-font-family);
        transition: var(--motion-transition);

        cursor: pointer;
        &:disabled {
          opacity: var(--opacity-disabled);
          cursor: not-allowed;
        }
      }
    }

    :host([size='large']) button {
      font-size: var(--typography-label-font-size-large);
      font-weight: var(--typography-label-font-weight-large);
      line-height: var(--typography-label-line-height-large);
      letter-spacing: var(--typography-label-letter-spacing-large);

      padding: var(--dimension-padding-large);
    }

    :host([size='medium']) button {
      font-size: var(--typography-label-font-size-medium);
      font-weight: var(--typography-label-font-weight-medium);
      line-height: var(--typography-label-line-height-medium);
      letter-spacing: var(--typography-label-letter-spacing-medium);

      padding: var(--dimension-padding-medium);
    }

    :host([size='small']) button {
      font-size: var(--typography-label-font-size-small);
      font-weight: var(--typography-label-font-weight-small);
      line-height: var(--typography-label-line-height-small);
      letter-spacing: var(--typography-label-letter-spacing-small);

      padding: var(--dimension-padding-small);
    }

    :host([color='accent'][variant='strong']) button {
      background-color: var(--color-accent-strong-background);
      border-color: var(--color-accent-strong-border);
      color: var(--color-accent-strong);
      &:hover {
        background-color: var(--color-accent-strong-background-hover);
        border-color: var(--color-accent-strong-border-hover);
        color: var(--color-accent-strong-hover);
      }
      &:active {
        background-color: var(--color-accent-strong-background-active);
        border-color: var(--color-accent-strong-border-active);
        color: var(--color-accent-strong-active);
      }
      &:disabled {
        background-color: var(--color-accent-strong-background-disabled);
        border-color: var(--color-accent-strong-border-disabled);
        color: var(--color-accent-strong-disabled);
      }
    }

    :host([color='accent'][variant='subtle']) button {
      background-color: var(--color-accent-subtle-background);
      border-color: var(--color-accent-subtle-border);
      color: var(--color-accent-subtle);
      &:hover {
        background-color: var(--color-accent-subtle-background-hover);
        border-color: var(--color-accent-subtle-border-hover);
        color: var(--color-accent-subtle-hover);
      }
      &:active {
        background-color: var(--color-accent-subtle-background-active);
        border-color: var(--color-accent-subtle-border-active);
        color: var(--color-accent-subtle-active);
      }
      &:disabled {
        background-color: var(--color-accent-subtle-background-disabled);
        border-color: var(--color-accent-subtle-border-disabled);
        color: var(--color-accent-subtle-disabled);
      }
    }

    :host([color='accent'][variant='outlined']) button {
      background-color: var(--color-accent-outlined-background);
      border-color: var(--color-accent-outlined-border);
      color: var(--color-accent-outlined);
      &:hover {
        background-color: var(--color-accent-outlined-background-hover);
        border-color: var(--color-accent-outlined-border-hover);
        color: var(--color-accent-outlined-hover);
      }
      &:active {
        background-color: var(--color-accent-outlined-background-active);
        border-color: var(--color-accent-outlined-border-active);
        color: var(--color-accent-outlined-active);
      }
      &:disabled {
        background-color: var(--color-accent-outlined-background-disabled);
        border-color: var(--color-accent-outlined-border-disabled);
        color: var(--color-accent-outlined-disabled);
      }
    }

    :host([color='accent'][variant='text']) button {
      background-color: var(--color-accent-text-background);
      border-color: var(--color-accent-text-border);
      color: var(--color-accent-text);
      &:hover {
        background-color: var(--color-accent-text-background-hover);
        border-color: var(--color-accent-text-border-hover);
        color: var(--color-accent-text-hover);
      }
      &:active {
        background-color: var(--color-accent-text-background-active);
        border-color: var(--color-accent-text-border-active);
        color: var(--color-accent-text-active);
      }
      &:disabled {
        background-color: var(--color-accent-text-background-disabled);
        border-color: var(--color-accent-text-border-disabled);
        color: var(--color-accent-text-disabled);
      }
    }

    :host([color='neutral'][variant='strong']) button {
      background-color: var(--color-neutral-strong-background);
      border-color: var(--color-neutral-strong-border);
      color: var(--color-neutral-strong);
      &:hover {
        background-color: var(--color-neutral-strong-background-hover);
        border-color: var(--color-neutral-strong-border-hover);
        color: var(--color-neutral-strong-hover);
      }
      &:active {
        background-color: var(--color-neutral-strong-background-active);
        border-color: var(--color-neutral-strong-border-active);
        color: var(--color-neutral-strong-active);
      }
      &:disabled {
        background-color: var(--color-neutral-strong-background-disabled);
        border-color: var(--color-neutral-strong-border-disabled);
        color: var(--color-neutral-strong-disabled);
      }
    }

    :host([color='neutral'][variant='subtle']) button {
      background-color: var(--color-neutral-subtle-background);
      border-color: var(--color-neutral-subtle-border);
      color: var(--color-neutral-subtle);
      &:hover {
        background-color: var(--color-neutral-subtle-background-hover);
        border-color: var(--color-neutral-subtle-border-hover);
        color: var(--color-neutral-subtle-hover);
      }
      &:active {
        background-color: var(--color-neutral-subtle-background-active);
        border-color: var(--color-neutral-subtle-border-active);
        color: var(--color-neutral-subtle-active);
      }
      &:disabled {
        background-color: var(--color-neutral-subtle-background-disabled);
        border-color: var(--color-neutral-subtle-border-disabled);
        color: var(--color-neutral-subtle-disabled);
      }
    }

    :host([color='neutral'][variant='outlined']) button {
      background-color: var(--color-neutral-outlined-backgroundt);
      border-color: var(--color-neutral-outlined-border);
      color: var(--color-neutral-outlined);
      &:hover {
        background-color: var(--color-neutral-outlined-background-hover);
        border-color: var(--color-neutral-outlined-border-hover);
        color: var(--color-neutral-outlined-hover);
      }
      &:active {
        background-color: var(--color-neutral-outlined-background-active);
        border-color: var(--color-neutral-outlined-border-active);
        color: var(--color-neutral-outlined-active);
      }
      &:disabled {
        background-color: var(--color-neutral-outlined-background-disabled);
        border-color: var(--color-neutral-outlined-border-disabled);
        color: var(--color-neutral-outlined-diaabled);
      }
    }

    :host([color='neutral'][variant='text']) button {
      background-color: var(--color-neutral-text-background);
      border-color: var(--color-neutral-text-border);
      color: var(--color-neutral-text);
      &:hover {
        background-color: var(--color-neutral-text-background-hover);
        border-color: var(--color-neutral-text-border-hover);
        color: var(--color-neutral-text-hover);
      }
      &:active {
        background-color: var(--color-neutral-text-background-active);
        border-color: var(--color-neutral-text-border-active);
        color: var(--color-neutral-text-active);
      }
      &:disabled {
        background-color: var(--color-neutral-text-background-disabled);
        border-color: var(--color-neutral-text-border-disabled);
        color: var(--color-neutral-text-disabled);
      }
    }

    :host([color='danger'][variant='strong']) button {
      background-color: var(--color-danger-strong-background);
      border-color: var(--color-danger-strong-border);
      color: var(--color-danger-strong);
      &:hover {
        background-color: var(--color-danger-strong-background-hover);
        border-color: var(--color-danger-strong-border-hover);
        color: var(--color-danger-strong-hover);
      }
      &:active {
        background-color: var(--color-danger-strong-background-active);
        border-color: var(--color-danger-strong-border-active);
        color: var(--color-danger-strong-active);
      }
      &:disabled {
        background-color: var(--color-danger-strong-background-disabled);
        border-color: var(--color-danger-strong-border-disabled);
        color: var(--color-danger-strong-disabled);
      }
    }

    :host([color='danger'][variant='subtle']) button {
      background-color: var(--color-danger-subtle-background);
      border-color: var(--color-danger-subtle-border);
      color: var(--color-danger-subtle);
      &:hover {
        background-color: var(--color-danger-subtle-background-hover);
        border-color: var(--color-danger-subtle-border-hover);
        color: var(--color-danger-subtle-hover);
      }
      &:active {
        background-color: var(--color-danger-subtle-background-active);
        border-color: var(--color-danger-subtle-border-active);
        color: var(--color-danger-subtle-active);
      }
      &:disabled {
        background-color: var(--color-danger-subtle-background-disabled);
        border-color: var(--color-danger-subtle-border-disabled);
        color: var(--color-danger-subtle-disabled);
      }
    }

    :host([color='danger'][variant='outlined']) button {
      background-color: var(--color-danger-outlined-background);
      border-color: var(--color-danger-outlined-border);
      color: var(--color-danger-outlined);
      &:hover {
        background-color: var(--color-danger-outlined-background-hover);
        border-color: var(--color-danger-outlined-border-hover);
        color: var(--color-danger-outlined-hover);
      }
      &:active {
        background-color: var(--color-danger-outlined-background-active);
        border-color: var(--color-danger-outlined-border-active);
        color: var(--color-danger-outlined-active);
      }
      &:disabled {
        background-color: var(--color-danger-outlined-background-disabled);
        border-color: var(--color-danger-outlined-border-disabled);
        color: var(--color-danger-outlined-disabled);
      }
    }

    :host([color='danger'][variant='text']) button {
      background-color: var(--color-danger-text-background);
      border-color: var(--color-danger-text-border);
      color: var(--color-danger-text);
      &:hover {
        background-color: var(--color-danger-text-background-hover);
        border-color: var(--color-danger-text-border-hover);
        color: var(--color-danger-text-hover);
      }
      &:active {
        background-color: var(--color-danger-text-background-active);
        border-color: var(--color-danger-text-border-active);
        color: var(--color-danger-text-active);
      }
      &:disabled {
        background-color: var(--color-danger-text-background-disabled);
        border-color: var(--color-danger-text-border-disabled);
        color: var(--color-danger-text-disabled);
      }
    }
  `;
}
