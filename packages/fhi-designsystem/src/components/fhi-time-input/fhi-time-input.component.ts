import { html, css, LitElement, type PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../icons/fhi-icon-clock.component.js';
import '../typography/fhi-body/fhi-body.component';
import '../typography/fhi-label/fhi-label.component';

import { isSafari } from '../../utils/browser';

export const FhiTimeInputSelector = 'fhi-time-input';

export type FhiTimeValue = `${number}:${number}` | undefined; // HH:MM

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
   * Sets minimum time available for selection in the input field. Format `HH:MM`.
   * @type {string}
   */
  @property({ type: String }) min?: FhiTimeValue = undefined;

  /**
   * Sets maximum time available for selection in the input field. Format `HH:MM`.
   * @type {string}
   */
  @property({ type: String }) max?: FhiTimeValue = undefined;

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
   * Disables the input. This changes its appearance and makes it non-interactive.
   * @reflect
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) disabled? = false;

  /**
   * The name of the input. This is submitted with the form data as a `key`.
   *
   * This attribute conforms with the standard HTML `name` attribute for input fields.
   * See: {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name}
   *
   * @reflect
   * @type {string}
   */
  @property({ type: String, reflect: true }) name?: string = undefined;

  /**
   * The default value of the input field, formatted as `HH:MM`.
   *
   * You can fetch the current value of the time input by accessing this property directly on the component instance, or by listening for the `change` or `input` events which are dispatched whenever the value changes.
   *
   * This attribute conforms with the standard HTML `value` attribute for input fields.
   * See: {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#value}
   *
   * @type {string}
   */
  @property({ type: String }) value: FhiTimeValue = '' as FhiTimeValue;

  @query('#input-element')
  private _input!: HTMLInputElement;

  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  public connectedCallback(): void {
    super.connectedCallback();

    this._internals.setFormValue(this.value ?? null);
  }

  protected willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('value') || changedProperties.has('name')) {
      this._internals.setFormValue(this.value ?? null);
    }
  }

  private _handleChange(event: Event): void {
    event.stopPropagation();
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
    this._internals.setFormValue(this.value ?? null);

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
    this.value = this.getAttribute('value') as FhiTimeValue;
    this._internals.setFormValue(this.value ?? null);
  }

  private _showTime(event?: KeyboardEvent) {
    if (
      this.disabled ||
      (event &&
        event.type == 'keydown' &&
        event.key !== 'Enter' &&
        event.code !== 'Space')
    ) {
      return;
    }

    try {
      this._input.showPicker();
    } catch {
      // safari does not have a picker
    }
  }

  private _handleIconMouseDown(event: MouseEvent): void {
    if (isSafari()) {
      event.preventDefault();
    }
  }

  render() {
    const describedBy =
      [this.helpText && 'help-text-element', this.message && 'message-element']
        .filter(Boolean)
        .join(' ') || undefined;

    return html`
      ${this.label &&
      html`<label for="input-element"
        ><fhi-label size="small">${this.label}</fhi-label></label
      >`}
      ${this.helpText
        ? html`
            <fhi-body id="help-text-element" class="help-text" size="small"
              >${this.helpText}</fhi-body
            >
          `
        : ''}
      <div class="input-container">
        <input
          type="time"
          id="input-element"
          aria-describedby=${ifDefined(describedBy)}
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
          class="time-icon"
          role="button"
          @click=${this._showTime}
          @keydown=${this._showTime}
          @mousedown=${this._handleIconMouseDown}
          tabindex=${isSafari() || this.disabled ? '-1' : '0'}
          aria-hidden=${String(isSafari())}
          aria-label="Vis tidvelger"
          aria-haspopup="dialog"
          ><fhi-icon-clock></fhi-icon-clock
        ></span>
      </div>
      ${this.message
        ? html`
            <fhi-body id="message-element" class="message" size="small"
              >${this.message}</fhi-body
            >
          `
        : ''}
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
        padding: 0 0 var(--fhi-spacing-050) 0;
        &:has(+ .help-text) {
          padding-bottom: 0;
        }
      }

      input[type='time'] {
        font-family: var(--fhi-font-family-default);
        font-weight: var(--fhi-typography-body-medium-font-weight);
        font-size: var(--fhi-typography-body-medium-font-size);
        line-height: var(--fhi-typography-body-medium-line-height);
        letter-spacing: var(--fhi-typography-body-medium-letter-spacing);

        box-sizing: border-box;

        height: var(--fhi-spacing-500);
        width: calc(var(--fhi-spacing-600) * 2 + var(--fhi-spacing-150));

        border: var(--fhi-dimension-border-width) solid
          var(--fhi-color-neutral-border-default);
        border-radius: var(--fhi-border-radius-050);
        padding: 0 var(--fhi-spacing-150) 0 var(--fhi-spacing-150);

        color: inherit;
        background-color: var(--fhi-color-neutral-background-default);
        transition: all var(--fhi-motion-ease-default)
          var(--fhi-motion-duration-quick);
        appearance: none;
        &:hover:not(:disabled) {
          border-color: var(--fhi-color-accent-border-default);
          background-color: var(--fhi-color-accent-background-subtle);
        }
        &:focus:not(:disabled) {
          border-color: var(--fhi-color-accent-border-strong);
          background-color: var(--fhi-color-accent-background-default);
        }
      }
      .message {
        margin: var(--fhi-spacing-050) 0 0 0;
      }

      .help-text {
        color: var(--fhi-color-neutral-text-subtle);
        margin: 0 0 var(--fhi-spacing-050) 0;
      }

      [type='time']::-webkit-inner-spin-button,
      [type='time']::-webkit-calendar-picker-indicator {
        display: none;
      }

      .input-container {
        height: var(--fhi-spacing-500);
        position: relative;
      }

      .time-icon {
        position: absolute;
        left: 76px;
        top: 50%;
        transform: translateY(-50%);
        margin-right: var(--fhi-spacing-100);
        height: fit-content;
        color: var(--fhi-color-neutral-text-subtle);
        transition: all var(--fhi-motion-ease-default)
          var(--fhi-motion-duration-quick);
        border-radius: var(--fhi-border-radius-050);
        &:focus {
          outline: solid var(--fhi-color-accent-border-default);
        }
      }
    }

    :host([disabled]) {
      opacity: var(--fhi-opacity-disabled);
      cursor: not-allowed;
      * {
        cursor: not-allowed;
      }
      .time-icon:focus {
        outline: none;
      }
    }

    :host([readonly]:not([disabled])) {
      input[type='time'] {
        border: unset;
        border-radius: unset;
        background-color: unset;
        border-left: var(--fhi-dimension-border-width) solid
          var(--fhi-color-neutral-border-default);
      }
      .time-icon {
        display: none;
      }
    }

    :host([status='error']:not([disabled]):not([readonly])) {
      label {
        color: var(--fhi-color-danger-text-default);
      }
      input[type='time'] {
        border-color: var(--fhi-color-danger-border-strong);
        background-color: var(--fhi-color-danger-background-default);
        color: var(--fhi-color-danger-text-default);
      }
      .message {
        color: var(--fhi-color-danger-text-subtle);
      }
      .help-text {
        color: var(--fhi-color-danger-text-default);
      }
      .time-icon {
        background-color: var(--fhi-color-danger-background-default);
        color: var(--fhi-color-danger-text-default);
      }
    }

    @-moz-document url-prefix() {
      :host .time-icon {
        display: none;
        visibility: hidden;
      }
    }
  `;
}
