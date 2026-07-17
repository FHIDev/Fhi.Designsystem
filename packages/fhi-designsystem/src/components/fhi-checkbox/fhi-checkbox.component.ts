import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export const FhiCheckboxSelector = 'fhi-checkbox';

/**
 * ## FHI Checkbox
 *
 * {@link https://designsystem.fhi.no/?path=/docs/komponenter-checkbox--docs}
 *
 * The `<fhi-checkbox>` component represents a checkbox input element styled and implemented according to the FHI Design System guidelines.
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
   * The text label assigned to and displayed next to the checkbox.
   * You should always provide a label.
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
   * Disables the checkbox. This changes its appearance and makes it non-interactive.
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

    event.stopPropagation();
    this._dispatchChangeEvent();
  }

  private _handleInput(event: Event): void {
    event.stopPropagation();
    this._dispatchInputEvent();
  }

  private _updateFormValue() {
    this._internals.setFormValue(this.checked ? this.value : null);
  }

  private _dispatchChangeEvent(): void {
    /**
     * @type {Event} - Standard DOM event with the type `change`.
     * This event is dispatched when the checkbox is checked or unchecked.
     */
    this.dispatchEvent(new Event('change', { bubbles: true }));
  }

  private _dispatchInputEvent(): void {
    /**
     * @type {Event} - Standard DOM event with the type `input`.
     * This event is dispatched when the checkbox is checked or unchecked.
     */
    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
  }

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
      --fhi-checkbox-color: currentcolor;
    }

    :host {
      display: flex;
      align-items: center;
      width: max-content;

      label {
        align-items: center;
        display: flex;
        position: relative;
        color: var(--fhi-checkbox-color);
        font-family: var(--fhi-font-family-default);
        -webkit-font-smoothing: antialiased;
        font-size: var(--fhi-typography-body-medium-font-size);
        font-weight: var(--fhi-typography-body-medium-font-weight);
        line-height: var(--fhi-typography-body-medium-line-height);
        letter-spacing: var(--fhi-typography-body-medium-letter-spacing);
        gap: var(--fhi-spacing-050);
      }

      input[type='checkbox'] {
        margin: 3px;
        appearance: none;
        width: 1.125rem;
        height: 1.125rem;
        background-color: var(--fhi-color-neutral-background-default);
        border: var(--fhi-dimension-border-width) solid
          var(--fhi-color-neutral-border-default);
        border-radius: var(--fhi-border-radius-050);
        transition: var(--fhi-motion-ease-default)
          var(--fhi-motion-duration-quick);

        &:hover {
          background-color: var(--fhi-color-accent-background-subtle);
          border-color: var(--fhi-color-accent-border-strong);
        }

        &:active {
          background-color: var(--fhi-color-accent-surface-default);
          outline: solid 5px var(--fhi-color-accent-surface-hover);
          border-color: var(--fhi-color-accent-border-strong);
        }

        &:checked {
          background-color: var(--fhi-color-neutral-base-default);
          border-color: var(--fhi-color-neutral-base-default);
          ~ .checkmark {
            fill: var(--fhi-color-neutral-text-inverted);
            visibility: visible;
            opacity: 1;
          }

          &:hover {
            background-color: var(--fhi-color-accent-base-hover);
            border-color: var(--fhi-color-accent-base-hover);
          }
          &:active {
            background-color: var(--fhi-color-accent-base-active);
            border-color: var(--fhi-color-accent-base-active);
          }
        }
      }

      .checkmark {
        visibility: hidden;
        opacity: 0;
        transition: opacity var(--fhi-motion-ease-default)
          var(--fhi-motion-duration-quick);
        position: absolute;
        height: 1.125rem;
        width: 1.125rem;
        margin-left: 3px;
      }
    }

    :host([disabled]) {
      opacity: var(--fhi-opacity-disabled);
      label,
      input {
        cursor: not-allowed;
      }

      input {
        &:hover {
          background-color: var(--fhi-color-neutral-background-default);
          border-color: var(--fhi-color-neutral-border-default);
        }

        &:active {
          outline: none;
          background-color: var(--fhi-color-neutral-background-default);
          border-color: var(--fhi-color-neutral-border-default);
        }

        &:checked:hover {
          background-color: var(--fhi-color-neutral-base-default);
          border-color: var(--fhi-color-neutral-base-default);
        }

        &:checked:active {
          background-color: var(--fhi-color-neutral-base-default);
          border-color: var(--fhi-color-neutral-base-default);
        }
      }
    }

    :host([status='error']:not([disabled])) {
      input[type='checkbox'] {
        background-color: var(--fhi-color-danger-background-default);
        border-color: var(--fhi-color-danger-border-default);

        &:hover {
          background-color: var(--fhi-color-danger-background-subtle);
          border-color: var(--fhi-color-danger-border-strong);
        }

        &:active {
          background-color: var(--fhi-color-danger-surface-default);
          outline: solid 5px var(--fhi-color-danger-surface-hover);
          border-color: var(--fhi-color-danger-border-strong);
        }

        &:checked {
          background-color: var(--fhi-color-danger-base-default);
          border-color: var(--fhi-color-danger-base-default);
          &:hover {
            background-color: var(--fhi-color-danger-base-hover);
            border-color: var(--fhi-color-danger-base-hover);
          }

          &:active {
            background-color: var(--fhi-color-danger-base-active);
            border-color: var(--fhi-color-danger-base-active);
          }
        }
      }
    }
  `;
}
