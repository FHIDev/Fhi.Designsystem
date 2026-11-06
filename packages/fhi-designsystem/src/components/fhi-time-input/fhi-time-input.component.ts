import { html, css, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import '../icons/fhi-icon-clock.component.js';
import '../typography/fhi-body/fhi-body.component';
import '../typography/fhi-label/fhi-label.component';

import { isSafari } from '../../utils/browser';

export const FhiTimeInputSelector = 'fhi-time-input';

export type FhiTimeValue = `${number}:${number}` | ''; // HH:MM

/**
 * ## FHI Time input
 *
 * {@link https://designsystem.fhi.no/?path=/docs/komponenter-time-input--docs}
 *
 * The `<fhi-time-input>` component represents a time input field styled and implemented according to the FHI Design System guidelines.
 * It allows users to select or input a time.
 *
 * @tag fhi-time-input
 * @element fhi-time-input
 *
 */
@customElement(FhiTimeInputSelector)
export class FhiTimeInput extends LitElement {
  /** @internal */
  static readonly formAssociated = true;

  /**
   * The text that labels the input field.
   * An input field should always have a label to ensure accessibility.
   * @type {string}
   */
  @property({ type: String }) label?: string;

  /**
   * The message shown beneath the input field.
   * This is often used to provide additional information or feedback to the user.
   * @type {string}
   */
  @property({ type: String }) message?: string;

  /**
   * The help-text shown above the input field.
   * This is often used to provide additional information to the user.
   * @type {string}
   */
  @property({ type: String, attribute: 'help-text' }) helpText?: string =
    undefined;

  /**
   * Sets minimum time available for selection in the input field. Format `HH:MM`.
   * @type {string}
   */
  @property({ type: String }) min?: FhiTimeValue;

  /**
   * Sets maximum time available for selection in the input field. Format `HH:MM`.
   * @type {string}
   */
  @property({ type: String }) max?: FhiTimeValue;

  /**
   * Sets the visual status of the input. There is currently only one status available: `error`.
   *
   * The `error` status is used to indicate that there is an issue with the input, such as invalid or missing data.
   * @reflect
   * @type {'error'}
   */
  @property({ type: String, reflect: true }) status?: 'error';

  /**
   * Sets the input to read-only. A read-only field cannot be modified by the user but may be submitted with the form.
   * @reflect
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) readonly? = false;

  /**
   * Disables the input. This changes its appearance and makes it non-interactive.
   * @reflect
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) disabled? = false;

  private _name?: string;

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
  }

  private _value: FhiTimeValue = '' as FhiTimeValue;

  /**
   * The default value of the input field, formatted as `HH:MM`.
   *
   * You can fetch the current value of the time input by accessing this property directly on the component instance, or by listening for the `change` or `input` events which are dispatched whenever the value changes.
   *
   * This attribute conforms with the standard HTML `value` attribute for input fields.
   * See: {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#value}
   *
   * @type {string}
   * @default ''
   */
  @property({ type: String })
  get value(): FhiTimeValue {
    return this._value;
  }

  set value(newValue: FhiTimeValue) {
    const oldValue = this._value;
    this._value = newValue;
    this.requestUpdate('value', oldValue);
    this._internals.setFormValue(this._value ?? null);
  }

  @query('#input')
  private _input!: HTMLInputElement;

  private _internals: ElementInternals;

  private _isSafari = isSafari();

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  public connectedCallback(): void {
    super.connectedCallback();

    this._internals.setFormValue(this.value ?? null);
  }

  private _handleChange(event: Event): void {
    event.stopPropagation();

    this.value = this._input.value as FhiTimeValue;

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
    event.stopPropagation();

    this.value = this._input.value as FhiTimeValue;

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
      this._internals.form.requestSubmit();
    }
  }

  public formResetCallback(): void {
    this.value = (this.getAttribute('value') || '') as FhiTimeValue;
  }

  private _handleIconClick(): void {
    this._showTimePicker();
  }

  private _handleIconKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.code === 'Space') {
      event.preventDefault();
      this._showTimePicker();
    }
  }

  private _showTimePicker(): void {
    if (this.disabled || this.readonly) {
      return;
    }

    try {
      this._input.showPicker();
    } catch {}
  }

  private _handleIconMouseDown(event: MouseEvent): void {
    if (this._isSafari) {
      event.preventDefault();
    }
  }

  render() {
    const describedBy =
      [this.helpText && 'help-text', this.message && 'message']
        .filter(Boolean)
        .join(' ') || undefined;

    return html`
      ${this.label &&
      html`<label id="label" for="input">
        <fhi-label size="small">${this.label}</fhi-label>
      </label>`}
      ${this.helpText &&
      html` <fhi-body id="help-text" size="small">${this.helpText}</fhi-body> `}
      <div class="input-container">
        <input
          type="time"
          id="input"
          aria-describedby=${ifDefined(describedBy)}
          aria-invalid=${this.status === 'error' ? 'true' : 'false'}
          min=${ifDefined(this.min)}
          max=${ifDefined(this.max)}
          .value=${this.value ?? ''}
          ?readonly=${this.readonly}
          ?disabled=${this.disabled}
          @change=${this._handleChange}
          @input=${this._handleInput}
          @keydown=${this._handleKeyDown}
        />
        <fhi-icon-clock
          class="time-icon"
          role=${ifDefined(this._isSafari ? 'presentation' : 'button')}
          @click=${this._handleIconClick}
          @keydown=${this._handleIconKeyDown}
          @mousedown=${this._handleIconMouseDown}
          tabindex=${this._isSafari || this.disabled ? '-1' : '0'}
          aria-label=${ifDefined(this._isSafari ? undefined : 'Velg tidspunkt')}
          aria-haspopup=${ifDefined(this._isSafari ? undefined : 'true')}
        ></fhi-icon-clock>
      </div>
      ${this.message &&
      html` <fhi-body id="message" size="small">${this.message}</fhi-body> `}
    `;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      font-family: var(--fhi-font-family-default);
      -webkit-font-smoothing: antialiased;

      color: var(--fhi-color-neutral-text-default);

      label {
        width: fit-content;
        padding: 0 0 var(--fhi-spacing-050) 0;
        &:has(+ #help-text) {
          padding-bottom: 0;
        }
      }

      input {
        font-family: var(--fhi-font-family-default);
        font-weight: var(--fhi-typography-body-medium-font-weight);
        font-size: var(--fhi-typography-body-medium-font-size);
        line-height: var(--fhi-typography-body-medium-line-height);
        letter-spacing: var(--fhi-typography-body-medium-letter-spacing);

        box-sizing: border-box;
        appearance: none;

        height: 100%;

        border: var(--fhi-dimension-border-width) solid
          var(--fhi-color-neutral-border-default);
        border-radius: var(--fhi-border-radius-050);
        padding: var(--fhi-spacing-100);
        padding-right: calc(
          var(--fhi-spacing-100) * 2 + var(--fhi-spacing-300)
        );

        background-color: var(--fhi-color-neutral-background-default);
        transition: all var(--fhi-motion-ease-default)
          var(--fhi-motion-duration-quick);

        &:hover:not(:disabled) {
          border-color: var(--fhi-color-accent-border-default);
          background-color: var(--fhi-color-accent-background-subtle);
        }

        &:focus:not(:disabled) {
          border-color: var(--fhi-color-accent-border-strong);
          background-color: var(--fhi-color-accent-background-default);
        }
      }
      #message {
        margin: var(--fhi-spacing-050) 0 0 0;
      }

      #help-text {
        color: var(--fhi-color-neutral-text-subtle);
        margin: 0 0 var(--fhi-spacing-050) 0;
      }

      ::-webkit-calendar-picker-indicator {
        display: none;
      }

      .input-container {
        position: relative;
        height: var(--fhi-spacing-500);
        width: fit-content;
      }

      .time-icon {
        position: absolute;
        right: var(--fhi-spacing-100);
        top: 50%;
        transform: translateY(-50%);
        color: var(--fhi-color-neutral-text-subtle);

        &:focus {
          outline: solid var(--fhi-color-accent-border-default);
        }
      }
    }

    :host([disabled]) {
      opacity: var(--fhi-opacity-disabled);
      * {
        cursor: not-allowed;
      }
      .time-icon:focus {
        outline: none;
      }
    }

    :host([readonly]:not([disabled])) {
      input {
        border: unset;
        border-radius: unset;
        background-color: unset;
        border-left: var(--fhi-dimension-border-width) solid
          var(--fhi-color-neutral-border-default);
        padding-right: var(--fhi-spacing-100);
      }

      .time-icon {
        display: none;
      }
    }

    :host([status='error']:not([disabled]):not([readonly])) {
      color: var(--fhi-color-danger-text-default);
      input {
        border-color: var(--fhi-color-danger-border-strong);
        background-color: var(--fhi-color-danger-background-default);
      }

      #help-text {
        color: inherit;
      }

      .time-icon {
        background-color: var(--fhi-color-danger-background-default);
      }

      #message {
        color: var(--fhi-color-danger-text-subtle);
      }
    }

    @-moz-document url-prefix() {
      :host {
        .time-icon {
          display: none;
        }

        input {
          padding-right: var(--fhi-spacing-050);
        }
      }
    }
  `;
}
