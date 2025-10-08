import { html, css, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../icons/fhi-icon-calendar.component.js';

export const FhiDateInputSelector = 'fhi-date-input';

export type FhiDateValue = `${number}-${number}-${number}` | undefined; // YYYY-MM-DD

/**
 * ##FHI Date input
 *
 * {@link https://designsystemet.dhi.no/?path=/docs/komponenter-date-input--docs}
 *
 * @tag fhi-date-input
 * @element fhi-date-input
 */
@customElement(FhiDateInputSelector)
export class FhiDateInput extends LitElement {
  static readonly formAssociated = true;

  /**
   * Text for label associated with input field.
   * @attr
   * @type {string}
   */
  @property({ type: String }) label?: string = undefined;

  /**
   * Text for message shown beneath the input field.
   * @attr
   * @type {string}
   */
  @property({ type: String }) message?: string = undefined;

  /**
   * Sets minium date available for selection in the input field. Format `YYYY-MM-DD`.
   * @attr
   * @type {string}
   */
  @property({ type: String }) min?: FhiDateValue = undefined;

  /**
   * Sets maximum date available for selection in the input field. Format `YYYY-MM-DD`.
   * @attr
   * @type {string}
   */
  @property({ type: String }) max?: FhiDateValue = undefined;

  /**
   * Decides if the field has a status, will change the look of the field.
   * @attr
   * @reflect
   * @type {'error'}
   */
  @property({ type: String, reflect: true }) status?: 'error' = undefined;

  /**
   * Set field to read only state.
   * @attr
   * @reflect
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) readonly? = false;

  /**
   * Disables the field.
   * @attr
   * @reflect
   */
  @property({ type: Boolean, reflect: true }) disabled? = false;

  /**
   * A reference to the internal `<input>` element.
   * @internal
   */
  @query('#input-element') _input!: HTMLInputElement;

  private _name?: string | undefined = undefined;

  /**
   * Name attribute for input field.
   * @attr
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
   * Input field value.
   * @attr
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

  /**
   * Dispatches a `change` event when the value of the input is comitted by the user.
   * @fires change
   */
  public _handleChange(): void {
    this.dispatchEvent(
      new Event('change', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  /**
   * Set new `value` to the input field.
   */
  public _handleInput(): void {
    this.value = this._input.value as FhiDateValue;
    this._internals.setFormValue(this.value ?? null);
  }

  /**
   * Requests submit on the key down `Enter`.
   */
  public _handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this._internals.form) {
      this._internals.form!.requestSubmit();
    }
  }

  /**
   * Resets the field when the associated form is reset.
   */
  public formResetCallback(): void {
    this.value = this.getAttribute('value') as FhiDateValue;
    this._internals.setFormValue(this.value ?? null);
  }

  /**
   * Shows the date picker when the calendar icon is clicked or activated by keyboard.
   * @internal
   */
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

  /**
   * Tests if the browser is safari.
   * @internal
   */
  private _isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }

  render() {
    return html`
      ${this.label && html`<label for="input-element">${this.label}</label>`}
      <div>
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
          id="dateIcon"
          @click=${this._showDate}
          @keydown=${this._showDate}
          tabindex=${this._isSafari() ? '-1' : '0'}
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

      --dimension-label-padding-bottom: var(--fhi-spacing-050);

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
    }

    :host {
      display: flex;
      flex-direction: column;
      font-family: var(--typography-font-family);
      width: var(--dimension-width);

      label {
        font-weight: var(--typography-label-font-weight);
        font-size: var(--typography-label-font-size);
        line-height: var(--typography-label-line-height);
        letter-spacing: var(--typography-label-letter-spacing);
        color: var(--color-label-text);
        padding-bottom: var(--dimension-label-padding-bottom);
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
        padding: 0 var(--dimension-input-padding-right) 0
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
      div {
        height: var(--dimension-input-height);
        position: relative;
      }
      #dateIcon {
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
      #dateIcon {
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
        &:hover + #dateIcon {
          background-color: unset;
        }
      }
      #dateIcon {
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
      #dateIcon {
        background-color: var(--color-input-background-error);
        color: var(--color-input-text-error);
      }
    }

    @-moz-document url-prefix() {
      :host {
        #dateIcon {
          display: none;
          visibility: hidden;
        }
      }
    }
  `;
}
