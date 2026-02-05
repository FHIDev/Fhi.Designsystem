import { html, css, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../icons/fhi-icon-calendar.component.js';

import { isSafari } from '../../utils/browser';

export const FhiDateInputSelector = 'fhi-date-input';

export type FhiDateValue = `${number}-${number}-${number}` | undefined; // YYYY-MM-DD

/**
 * ## FHI Date input
 *
 * {@link https://designsystemet.dhi.no/?path=/docs/komponenter-date-input--docs}
 *
 * The `<fhi-date-input>` component represents a date input field styled and implemented according to the FHI Design System guidelines.
 * It allows users to select or input a date.
 *
 * @tag fhi-date-input
 * @element fhi-date-input
 */
@customElement(FhiDateInputSelector)
export class FhiDateInput extends LitElement {
  /** @internal */
  static readonly formAssociated = true;

  /**
   * The text that labels the input field.
   * An input field should always have a label to ensure accessibility.
   * @type {string}
   */
  @property({ type: String }) label?: string = undefined;

  /**
   * The message shown beneath the input field.
   * This is often used to provide additional information or feedback to the user.
   * @type {string}
   */
  @property({ type: String }) message?: string = undefined;

  /**
   * The help-text shown above the input field.
   * This is often used to provide additional information to the user.
   * @type {string}
   */
  @property({ type: String, attribute: 'help-text' }) helpText?: string =
    undefined;

  /**
   * Sets minium date available for selection in the input field. Format `YYYY-MM-DD`.
   * @type {string}
   */
  @property({ type: String }) min?: FhiDateValue = undefined;

  /**
   * Sets maximum date available for selection in the input field. Format `YYYY-MM-DD`.
   * @type {string}
   */
  @property({ type: String }) max?: FhiDateValue = undefined;

  /**
   * Sets the visual status of the input. There is currently only one status available: `error`.
   *
   * The `error` status is used to indicate that there is an issue with the input, such as invalid or missing data.
   * @reflect
   * @type {'error'}
   */
  @property({ type: String, reflect: true }) status?: 'error' = undefined;

  /**
   * Sets the input to read-only. A read-only field cannot be modified by the user but may be submitted with the form.
   * @reflect
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) readonly? = false;

  /**
   * Disables the input.  This changes its appearance and makes it non-interactive.
   * @reflect
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) disabled? = false;

  @query('#input-element')
  private _input!: HTMLInputElement;

  private _name?: string | undefined = undefined;

  /**
   * The name of the input. This is submitted with the form data as a `key`.
   *
   * This attribute conforms with the standard HTML `name` attribute for input fields.
   * See: {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name}
   *
   * @reflect
   * @type {string}
   */
  @property({ type: String, reflect: true })
  get name(): string | undefined {
    return this._name;
  }

  set name(newName: string | undefined) {
    const oldName = this._name;
    this._name = newName;
    this.requestUpdate('name', oldName);
    this._internals.setFormValue(this.value ?? null);
  }

  private _value?: string = '';

  /**
   * The default value of the input field, formatted as `YYYY-MM-DD`.
   *
   * You can fetch the current value of the date input by accessing this property directly on the component instance, or by listening for the `change` or `input` events which are dispatched whenever the value changes.
   *
   * This attribute conforms with the standard HTML `value` attribute for input fields.
   * See: {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#value}
   *
   * @type {string}
   */
  @property({ type: String })
  get value(): FhiDateValue {
    return this._value as FhiDateValue;
  }

  set value(newValue: FhiDateValue) {
    const oldValue = this._value;
    this._value = newValue;
    this.requestUpdate('value', oldValue);
    this._internals.setFormValue(this._value ?? null);
  }

  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._internals.setFormValue(this.value ?? null);
  }

  private _handleChange(): void {
    this._dispatchChangeEvent();
  }

  private _dispatchChangeEvent(): void {
    /**
     * @type {Event} - Standard DOM event with the type `change`.
     * This event is dispatched when the value of the input changes.
     */
    this.dispatchEvent(
      new Event('change', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _handleInput(event: Event): void {
    this.value = this._input.value as FhiDateValue;
    this._internals.setFormValue(this.value ?? null);
    event.stopPropagation();
    this._dispatchInputEvent();
  }

  private _dispatchInputEvent(): void {
    /**
     * @type {Event} - Standard DOM event with the type `input`.
     * This event is dispatched when the value of the input changes.
     */
    this.dispatchEvent(
      new Event('input', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this._internals.form) {
      this._internals.form!.requestSubmit();
    }
  }

  public formResetCallback(): void {
    this.value = this.getAttribute('value') as FhiDateValue;
    this._internals.setFormValue(this.value ?? null);
  }

  private _showDate(event?: KeyboardEvent) {
    if (
      event &&
      event.type == 'keydown' &&
      event.key !== 'Enter' &&
      event.code !== 'Space'
    ) {
      return;
    }
    this._input.showPicker();
  }

  render() {
    return html`
      ${this.label && html`<label for="input-element">${this.label}</label>`}
      ${this.helpText && html`<p class="help-text">${this.helpText}</p>`}
      <div class="input-container">
        <input
          type="date"
          id="input-element"
          name=${ifDefined(this.name)}
          min=${ifDefined(this.min)}
          max=${ifDefined(this.max)}
          .value=${this.value ?? ''}
          ?readonly=${this.readonly}
          ?disabled=${this.disabled}
          @change=${this._handleChange}
          @input=${this._handleInput}
          @keydown=${this._handleKeyDown}
        />
        <span
          class="date-icon"
          @click=${this._showDate}
          @keydown=${this._showDate}
          tabindex=${isSafari() ? '-1' : '0'}
          role="button"
          aria-label="Vis datovelger"
          aria-haspopup="true"
          ><fhi-icon-calendar></fhi-icon-calendar
        ></span>
      </div>
      ${this.message && html`<p class="message">${this.message}</p>`}
    `;
  }

  static styles = css`
    :host {
      --typography-font-family: var(--fhi-font-family-default);

      --opacity-disabled: var(--fhi-opacity-disabled);

      --dimension-width: calc(var(--fhi-spacing-1000) * 2);

      /* label */
      --color-label-text: var(--fhi-color-neutral-text-default);
      --color-label-text-error: var(--fhi-color-danger-text-default);

      --typography-label-font-family: var(--fhi-typography-label-small-font);
      --typography-label-font-weight: var(
        --fhi-typography-label-small-font-weight
      );
      --typography-label-font-size: var(--fhi-typography-label-small-size);
      --typography-label-line-height: var(
        --fhi-typography-label-small-line-height
      );
      --typography-label-letter-spacing: var(
        --fhi-typography-label-small-letter-spacing
      );

      /* input */
      --color-input-text: var(--fhi-color-neutral-text-default);
      --color-input-text-error: var(--fhi-color-danger-text-default);
      --color-input-background: var(--fhi-color-neutral-background-default);
      --color-input-background-active: var(
        --fhi-color-accent-background-default
      );
      --color-input-background-hover: var(--fhi-color-accent-background-subtle);
      --color-input-background-error: var(
        --fhi-color-danger-background-default
      );
      --color-input-border: var(--fhi-color-neutral-border-default);
      --color-input-border-hover: var(--fhi-color-accent-border-default);
      --color-input-border-active: var(--fhi-color-accent-border-strong);
      --color-input-border-error: var(--fhi-color-danger-border-strong);
      --color-input-border-disabled: var(--fhi-color-neutral-border-default);
      --color-input-selection-background: var(
        --fhi-color-accent-surface-active
      );

      --typography-input-font-weight: var(
        --fhi-typography-body-medium-font-weight
      );
      --typography-input-font-size: var(--fhi-typography-body-medium-font-size);
      --typography-input-line-height: var(
        --fhi-typography-body-medium-line-height
      );
      --typography-input-letter-spacing: var(
        --fhi-typography-body-medium-letter-spacing
      );

      --dimension-input-border-width: var(--fhi-dimension-border-width);

      --dimension-input-height: var(--fhi-spacing-500);
      --dimension-input-border-radius: var(--fhi-border-radius-050);
      --dimension-input-padding-left: var(--fhi-spacing-150);
      --dimension-input-padding-right: var(--fhi-spacing-150);
      --dimension-input-padding-top: var(--fhi-spacing-050);

      --motion-input-transition: all var(--fhi-motion-ease-default)
        var(--fhi-motion-duration-quick);

      /* icon */
      --dimension-icon-margin-right: var(--fhi-spacing-100);
      --dimension-icon-padding-left: var(--fhi-spacing-050);

      --color-icon-focus-outline: var(--fhi-color-accent-border-default);

      --dimension-icon-border-radius: var(--fhi-border-radius-050);

      /* message */
      --color-message-text: var(--fhi-color-neutral-text-default);
      --color-message-text-error: var(--fhi-color-danger-text-subtle);

      --typography-message-font-weight: var(
        --fhi-typography-body-small-font-weight
      );
      --typography-message-font-size: var(
        --fhi-typography-body-small-font-size
      );
      --typography-message-line-height: var(
        --fhi-typography-body-small-line-height
      );
      --typography-message-letter-spacing: var(
        --fhi-typography-body-small-letter-spacing
      );

      --dimension-message-margin-top: var(--fhi-spacing-050);

      /* help-text */
      --color-help-text-text: var(--fhi-color-neutral-text-subtle);
      --color-help-text-text-error: var(--fhi-color-danger-text-default);

      --typography-help-text-font-weight: var(
        --fhi-typography-body-small-font-weight
      );
      --typography-help-text-font-size: var(
        --fhi-typography-body-small-font-size
      );
      --typography-help-text-line-height: var(
        --fhi-typography-body-small-line-height
      );
      --typography-help-text-letter-spacing: var(
        --fhi-typography-body-small-letter-spacing
      );
    }

    :host {
      display: flex;
      flex-direction: column;
      font-family: var(--typography-font-family);
      -webkit-font-smoothing: antialiased;
      width: var(--dimension-width);

      label {
        font-weight: var(--typography-label-font-weight);
        font-size: var(--typography-label-font-size);
        line-height: var(--typography-label-line-height);
        letter-spacing: var(--typography-label-letter-spacing);
        color: var(--color-label-text);
      }

      input[type='date'] {
        font-family: var(--typography-font-family);
        font-weight: var(--typography-input-font-weight);
        font-size: var(--typography-input-font-size);
        line-height: var(--typography-input-line-height);
        letter-spacing: var(--typography-input-letter-spacing);
        box-sizing: border-box;
        height: var(--dimension-input-height);
        border: var(--dimension-input-border-width) solid
          var(--color-input-border);
        border-radius: var(--dimension-input-border-radius);
        padding: var(--dimension-input-padding-top)
          var(--dimension-input-padding-right) 0
          var(--dimension-input-padding-left);
        color: var(--color-input-text);
        background-color: var(--color-input-background);
        transition: var(--motion-input-transition);
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        width: 100%;
        &:hover {
          border-color: var(--color-input-border-hover);
          background-color: var(--color-input-background-hover);
        }
        &:focus {
          outline: none;
          border-color: var(--color-input-border-active);
          background-color: var(--color-input-background-active);
        }
      }
      .message {
        margin: var(--dimension-message-margin-top) 0 0 0;
        color: var(--color-message-text);
        font-weight: var(--typography-message-font-weight);
        font-size: var(--typography-message-font-size);
        line-height: var(--typography-message-line-height);
        letter-spacing: var(--typography-message-letter-spacing);
      }

      .help-text {
        margin: var(--dimension-help-text-margin-top) 0 0 0;
        color: var(--color-help-text-text);
        font-weight: var(--typography-help-text-font-weight);
        font-size: var(--typography-help-text-font-size);
        line-height: var(--typography-help-text-line-height);
        letter-spacing: var(--typography-help-text-letter-spacing);
        padding-bottom: var(--dimension-help-text-padding-bottom);
      }
      [type='date']::-webkit-inner-spin-button {
        opacity: 0;
      }
      [type='date']::-webkit-calendar-picker-indicator {
        opacity: 0;
        -webkit-appearance: none;
        display: none;
        visibility: hidden;

        &:target {
          outline: solid;
          font-size: 5rem;
        }
      }
      .input-container {
        height: var(--dimension-input-height);
        position: relative;
      }
      .date-icon {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        margin-right: var(--dimension-icon-margin-right);
        height: fit-content;
        transition: var(--motion-input-transition);
        border-radius: var(--dimension-icon-border-radius);
        &:focus {
          outline: solid var(--color-icon-focus-outline);
        }
      }
    }

    :host([disabled]) {
      opacity: var(--opacity-disabled);
      cursor: not-allowed;
      * {
        cursor: not-allowed;
      }
      input[type='date'] {
        &:hover {
          border-color: var(--color-input-border);
          background-color: var(--color-input-background);
        }
      }
      .date-icon {
        background-color: unset;
        &:focus {
          outline: none;
        }
      }
    }

    :host([readonly]:not([disabled])) {
      input[type='date'] {
        border: unset;
        border-radius: unset;
        background-color: unset;
        border-left: var(--dimension-input-border-width) solid
          var(--color-input-border);
        &:hover + .date-icon {
          background-color: unset;
        }
      }
      .date-icon {
        background-color: unset;
        display: none;
      }
    }

    :host([status='error']:not([disabled]):not([readonly])) {
      label {
        color: var(--color-label-text-error);
      }
      input[type='date'] {
        border-color: var(--color-input-border-error);
        background-color: var(--color-input-background-error);
        color: var(--color-input-text-error);
      }
      .message {
        color: var(--color-message-text-error);
      }
      .help-text {
        color: var(--color-help-text-text-error);
      }
      .date-icon {
        background-color: var(--color-input-background-error);
        color: var(--color-input-text-error);
      }
    }

    @-moz-document url-prefix() {
      :host {
        .date-icon {
          display: none;
          visibility: hidden;
        }
      }
    }
  `;
}
