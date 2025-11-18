import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export const FhiCheckboxSelector = 'fhi-checkbox';

/**
 * ## FHI Checkbox
 *
 * {@link https://designsystem.fhi.no/?path=/docs/komponenter-checkbox--docs}
 *
 * The `fhi-checkbox` component represents a checkbox input element styled according to the FHI Design System guidelines.
 * It allows users to make binary choices, such as selecting or deselecting an option.
 *
 * @tag fhi-checkbox
 * @element fhi-checkbox
 */
@customElement(FhiCheckboxSelector)
export class FhiCheckbox extends LitElement {
  /** @internal */
  static readonly formAssociated = true;

  /**
   * The text labeling the checkbox. A checkbox should always have a label.
   * @type {string}
   */
  @property({ type: String }) label?: string = undefined;

  /**
   * The name of the checkbox. This is submitted with the form data as a `key` when the checkbox is checked.
   * @type {string}
   */
  @property({ type: String }) name?: string = undefined;

  /**
   * The value of the checkbox. This is submitted with the form data as a `value` when the checkbox is checked.
   * @type {string}
   */
  @property({ type: String }) value: string = 'on';

  /**
   * Sets the visual status of the checkbox. There is currently only one status available: `error`.
   * The `error` status is used to indicate that there is an issue with the checkbox, such as a required checkbox not being checked.
   * @reflect
   * @type {'error' | undefined}
   */
  @property({ type: String, reflect: true }) status?: 'error' | undefined;

  /**
   * Whether the checkbox is checked or not.
   * @type {boolean}
   */
  @property({ type: Boolean }) checked? = false;

  /**
   * Disables the checkbox. This changes the design and makes it non-interactive.
   * @reflect
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) disabled? = false;

  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._updateFormValue();
  }

  private _handleChange(event: Event): void {
    this.checked = (event.target as HTMLInputElement).checked;
    this._updateFormValue();
    /**@type {Event} - Standard DOM event with the type `change` */
    this.dispatchEvent(
      new Event('change', {
        bubbles: true,
      }),
    );
  }

  private _handleInput(event: Event): void {
    event.stopPropagation();
    /**@type {Event} - Standard DOM event with the type `input`*/
    this.dispatchEvent(
      new Event('input', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _updateFormValue() {
    this._internals.setFormValue(this.checked ? this.value : null);
  }

  /** @internal */
  public formResetCallback() {
    this.checked = false;
    this._updateFormValue();
  }

  render() {
    return html`
      <label>
        <input
          type="checkbox"
          name="${ifDefined(this.name)}"
          value="${ifDefined(this.value)}"
          ?disabled=${this.disabled}
          ?checked=${this.checked}
          @change=${this._handleChange}
          @input=${this._handleInput}
        />
        <svg
          class="checkmark"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.043 6.04295C12.4335 5.65243 13.0666 5.65243 13.4571 6.04295C13.8476 6.43348 13.8476 7.06649 13.4571 7.45702L8.95708 11.957C8.56655 12.3475 7.93354 12.3475 7.54302 11.957L5.29302 9.70702C4.90249 9.31649 4.90249 8.68348 5.29302 8.29295C5.65913 7.92684 6.23813 7.90424 6.63091 8.22459L6.70708 8.29295L8.25005 9.83592L12.043 6.04295Z"
          />
        </svg>

        ${this.label}
      </label>
    `;
  }

  static styles = css`
    :host {
      --typography-font-family: var(--fhi-font-family-default);
      --typography-font-size: var(--fhi-typography-body-medium-font-size);
      --typography-font-weight: var(--fhi-typography-body-medium-font-weight);
      --typography-line-height: var(--fhi-typography-body-medium-line-height);
      --typography-letter-spacing: var(
        --fhi-typography-body-medium-letter-spacing
      );

      --color-text: var(--fhi-color-neutral-text-default);
      --color-checkbox-checkmark: var(--fhi-color-neutral-text-inverted);
      --color-checkbox: var(--fhi-color-neutral-background-default);
      --color-checkbox-border: var(--fhi-color-neutral-border-default);
      --color-checkbox-hover: var(--fhi-color-accent-background-subtle);
      --color-checkbox-border-hover: var(--fhi-color-accent-border-strong);
      --color-checkbox-border-active: var(--fhi-color-accent-border-strong);
      --color-checkbox-active: var(--fhi-color-accent-surface-default);
      --color-checkbox-checked: var(--fhi-color-neutral-base-default);
      --color-checkbox-checked-hover: var(--fhi-color-accent-base-hover);
      --color-checkbox-checked-active: var(--fhi-color-accent-base-active);
      --color-checkbox-error: var(--fhi-color-danger-background-default);
      --color-checkbox-border-error: var(--fhi-color-danger-border-default);
      --color-checkbox-error-hover: var(--fhi-color-danger-background-subtle);
      --color-checkbox-border-error-hover: var(
        --fhi-color-danger-border-strong
      );
      --color-checkbox-error-active: var(--fhi-color-danger-surface-default);
      --color-checkbox-error-checked: var(--fhi-color-danger-base-default);
      --color-checkbox-checked-error-hover: var(--fhi-color-danger-base-hover);
      --color-checkbox-checked-error-active: var(
        --fhi-color-danger-base-active
      );
      --color-checkbox-outline: var(--fhi-color-accent-surface-hover);
      --color-checkbox-outline-error: var(--fhi-color-danger-surface-hover);

      --dimension-checkbox-gap: var(--fhi-spacing-050);
      --dimension-checkbox-border-radius: var(--fhi-border-radius-050);
      --dimension-checkbox-border-width: var(--fhi-dimension-border-width);
      --dimension-checkbox-size: 1.125rem;
      --dimension-checkbox-margin: 3px;

      --opacity-disabled: var(--fhi-opacity-disabled);
      --motion-checkbox-transition: var(--fhi-motion-ease-default)
        var(--fhi-motion-duration-quick);
    }

    :host {
      display: flex;
      align-items: center;
      width: max-content;

      label {
        align-items: center;
        display: flex;
        position: relative;
        color: var(--color-text);
        font-family: var(--typography-font-family);
        -webkit-font-smoothing: antialiased;
        font-size: var(--typography-font-size);
        font-weight: var(--typography-font-weight);
        line-height: var(--typography-line-height);
        letter-spacing: var(--typography-letter-spacing);
        gap: var(--dimension-checkbox-gap);
      }

      input[type='checkbox'] {
        margin: var(--dimension-checkbox-margin);
        appearance: none;
        width: var(--dimension-checkbox-size);
        height: var(--dimension-checkbox-size);
        background-color: var(--color-checkbox);
        border: var(--dimension-checkbox-border-width) solid
          var(--color-checkbox-border);
        border-radius: var(--dimension-checkbox-border-radius);
        transition: var(--motion-checkbox-transition);

        &:hover {
          background-color: var(--color-checkbox-hover);
          border-color: var(--color-checkbox-border-hover);
        }

        &:active {
          background-color: var(--color-checkbox-active);
          outline: solid 5px var(--color-checkbox-outline);
          border-color: var(--color-checkbox-border-active);
        }

        &:checked {
          background-color: var(--color-checkbox-checked);
          border-color: var(--color-checkbox-checked);
          ~ .checkmark {
            fill: var(--color-checkbox-checkmark);
            visibility: visible;
            opacity: 1;
          }

          &:hover {
            background-color: var(--color-checkbox-checked-hover);
            border-color: var(--color-checkbox-checked-hover);
          }
          &:active {
            background-color: var(--color-checkbox-checked-active);
            border-color: var(--color-checkbox-checked-active);
          }
        }
      }

      .checkmark {
        visibility: hidden;
        opacity: 0;
        transition: opacity var(--motion-checkbox-transition);
        position: absolute;
        height: var(--dimension-checkbox-size);
        width: var(--dimension-checkbox-size);
        margin-left: var(--dimension-checkbox-margin);
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
          background-color: var(--color-checkbox);
          border-color: var(--color-checkbox-border);
        }

        &:checked:hover {
          background-color: var(--color-checkbox-checked);
          border-color: var(--color-checkbox-checked);
        }

        &:checked:active {
          background-color: var(--color-checkbox-checked);
          border-color: var(--color-checkbox-checked);
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
          outline: solid 5px var(--color-checkbox-outline-error);
          border-color: var(--color-checkbox-border-error-hover);
        }

        &:checked {
          background-color: var(--color-checkbox-error-checked);
          border-color: var(--color-checkbox-error-checked);
          &:hover {
            background-color: var(--color-checkbox-checked-error-hover);
            border-color: var(--color-checkbox-checked-error-hover);
          }

          &:active {
            background-color: var(--color-checkbox-checked-error-active);
            border-color: var(--color-checkbox-checked-error-active);
          }
        }
      }
    }
  `;
}
