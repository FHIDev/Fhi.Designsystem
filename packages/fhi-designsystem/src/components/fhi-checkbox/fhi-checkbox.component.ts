import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiCheckboxSelector = 'fhi-checkbox';

@customElement(FhiCheckboxSelector)
export class FhiCheckbox extends LitElement {
  static readonly formAssociated = true;

  @property({ type: String }) id = '';
  @property({ type: String }) label = '';
  @property({ type: String }) name = '';
  @property({ type: String }) value = '';
  @property({ type: String, reflect: true }) status?: 'error' | undefined;
  @property({ type: Boolean }) checked? = false;
  @property({ type: Boolean, reflect: true }) disabled? = false;

  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._updateFormValue(this.value);
  }

  public _handleChange(event: Event): void {
    this.checked = (event.target as HTMLInputElement).checked;
    this._updateFormValue(this.value);
    this.requestUpdate();
    this.dispatchEvent(
      new Event('change', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _updateFormValue(value: string) {
    if (value == '') {
      this._internals.setFormValue(this.checked ? 'on' : null);
    } else {
      this._internals.setFormValue(this.checked ? value : null);
    }
  }

  formResetCallback() {
    this.checked = false;
    this._updateFormValue(this.value);
  }

  render() {
    return html`
      <label>
        <input
          type="checkbox"
          name="${this.name}"
          id="${this.id}"
          value="${this.value}"
          ?disabled="${this.disabled}"
          ?checked="${this.checked}"
          @change=${this._handleChange}
        />
        ${this.label}
      </label>
    `;
  }

  static styles = css`
    :host {
      --typography-font-family: var(--fhi-font-family-default);
      --opacity-disabled: var(--fhi-opacity-disabled);
      --color-text: var(--fhi-color-neutral-text-default);
      --typography-font-size: var(--fhi-typography-body-medium-font-size);
      --typography-font-weight: var(--fhi-typography-body-medium-font-weight);
      --typography-line-height: var(--fhi-typography-body-medium-line-height);
      --typography-letter-spacing: var(
        --fhi-typography-body-medium-letter-spacing
      );
      --dimension-gap: var(--fhi-spacing-150);

      --color-checkbox: var(--fhi-color-neutral-background-default);
      --color-checkbox-border: var(--fhi-color-neutral-border-default);
      --color-checkbox-hover: var(--fhi-color-accent-background-subtle);
      --color-checkbox-border-hover: var(--fhi-color-accent-border-strong);
      --color-checkbox-active: var(--fhi-color-accent-surface-default);
      --checkbox-outline: solid 5px var(--fhi-color-accent-surface-hover);
      --color-checkbox-checked: var(--fhi-color-neutral-base-default);
      --color-checkbox-border-checked: var(--fhi-color-neutral-base-default);
      --color-checkbox-checked-hover: var(--fhi-color-accent-base-hover);
      --color-checkbox-border-checked-hover: var(--fhi-color-accent-base-hover);

      --color-checkbox-error: var(--fhi-color-danger-background-default);
      --color-checkbox-border-error: var(--fhi-color-danger-border-default);
      --color-checkbox-error-hover: var(--fhi-color-danger-background-subtle);
      --color-checkbox-border-error-hover: var(
        --fhi-color-danger-border-strong
      );
      --color-checkbox-error-active: var(--fhi-color-danger-surface-hover);
      --checkbox-outline-error: solid 5px var(--fhi-color-danger-surface-hover);
      --color-checkbox-error-checked: var(--fhi-color-danger-base-default);
      --color-checkbox-border-error-checked: var(
        --fhi-color-neutral-base-default
      );
      --color-checkbox-checked-error-hover: var(--fhi-color-danger-base-hover);
      --color-checkbox-border-checked-error-hover: var(
        --fhi-color-danger-base-hover
      );
      --color-checkbox-checked-error-active: var(
        --fhi-color-danger-base-active
      );
      --color-checkbox-border-checked-error-active: var(
        --fhi-color-danger-base-active
      );
      --motion-checkbox-transition: var(--fhi-motion-ease-default)
        var(--fhi-motion-duration-quick);
    }

    :host {
      display: block;
      label {
        color: var(--color-text);
        font-family: var(--typography-font-family);
        font-size: var(--typography-font-size);
        font-weight: var(--typography-font-weight);
        line-height: var(--typography-line-height);
        letter-spacing: var(--typography-letter-spacing);
        display: grid;
        grid-template-columns: 1rem auto;
        justify-self: start;
        gap: var(--dimension-gap);
      }

      input[type='checkbox'] {
        appearance: none;
        width: 18px;
        height: 18px;
        background-color: var(--color-checkbox);
        border: 1px solid var(--color-checkbox-border);
        border-radius: 4px;
        flex-shrink: 0;
        aspect-ratio: 1/1;
        display: grid;
        place-content: center;
        transition: var(--motion-checkbox-transition);

        &:hover {
          background-color: var(--color-checkbox-hover);
          border-color: var(--color-checkbox-border-hover);
        }

        &:active {
          background-color: var(--color-checkbox-active);
          outline: var(--checkbox-outline); // change token name
          border-color: var(--color-checkbox-border-hover);
        }

        &:checked {
          background-color: var(--color-checkbox-checked);
          border-color: var(--color-checkbox-border-checked);

          &:hover {
            background-color: var(--color-checkbox-checked-hover);
            border-color: var(--color-checkbox-border-checked-hover);
          }
          &:active {
            background-color: var(--color-checkbox-checked-hover);
            border-color: var(--color-checkbox-border-checked-hover);
          }
        }
      }

      input[type='checkbox']::before {
        content: '';
        width: 18px;
        height: 18px;
        transform: scale(0);

        background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none"><path d="M12.043 6.04295C12.4335 5.65243 13.0666 5.65243 13.4571 6.04295C13.8476 6.43348 13.8476 7.06649 13.4571 7.45702L8.95708 11.957C8.56655 12.3475 7.93354 12.3475 7.54302 11.957L5.29302 9.70702C4.90249 9.31649 4.90249 8.68348 5.29302 8.29295C5.65913 7.92684 6.23813 7.90424 6.63091 8.22459L6.70708 8.29295L8.25005 9.83592L12.043 6.04295Z" fill="%23FDFEFF"/></svg>');
      }

      input[type='checkbox']:checked::before {
        transform: scale(1);
      }
    }

    :host([disabled]) {
      opacity: var(--opacity-disabled);
      * {
        cursor: not-allowed;
      }

      input {
        &:hover {
          background-color: var(--color-checkbox);
          border-color: var(--color-checkbox-border);
        }

        &:active {
          outline: none;
        }

        &:checked:hover {
          background-color: var(--color-checkbox-checked-hover);
          border-color: var(--color-checkbox-border-checked-hover);
        }
      }
    }

    :host([status='error']:not([disabled])) {
      input[type='checkbox'] {
        background-color: var(--color-checkbox-error);
        border-color: var(--color-checkbox-border-error);

        &:hover {
          background-color: var(--color-checkbox-error-hover);
          border-color: var(--color-checkbox-border-error-hover);
        }

        &:active {
          background-color: var(--color-checkbox-error-active);
          outline: var(--checkbox-outline-error);
          border-color: var(--color-checkbox-border-error-hover);
        }

        &:checked {
          background-color: var(--color-checkbox-error-checked);
          border-color: var(--color-checkbox-border-error);
          &:hover {
            background-color: var(--color-checkbox-checked-error-hover);
            border-color: var(--color-checkbox-border-checked-error-hover);
          }

          &:active {
            background-color: var(--color-checkbox-checked-error-active);
            border-color: var(--color-checkbox-border-checked-error-active);
          }
        }
      }
    }
  `;
}
