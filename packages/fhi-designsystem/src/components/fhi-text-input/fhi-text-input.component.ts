import { html, css, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export const FhiTextInputSelector = 'fhi-text-input';

/**
 * ## FHI Text Input
 *
 * {@link https://designsystem.fhi.no/?path=/docs/komponenter-text-input--docs}
 *
 * The `<fhi-text-input>` component is used to collect user input in forms.
 * It provides a labeled input field with optional placeholder text, status indication, and a message area for additional information or validation feedback.
 *
 * @tag fhi-text-input
 * @element fhi-text-input
 */
@customElement(FhiTextInputSelector)
export class FhiTextInput extends LitElement {
  /** @internal */
  static readonly formAssociated = true;

  /**
   * The text the labels the input field.
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
   * Sets the placeholder text for the input field.
   * This text is displayed when the input field is empty, providing a hint to the user about the expected input.
   * @type {string}
   */
  @property({ type: String }) placeholder?: string | null = null;

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
   * Disables the input.  This changes the design and makes it non-interactive.
   * @reflect
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) disabled? = false;

  @query('#input-element')
  private _input!: HTMLInputElement;

  private _name?: string = undefined;

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
  set name(newName: string) {
    const oldName = this._name;
    this._name = newName;
    this.requestUpdate('name', oldName);
    this._internals.setFormValue(this._value);
  }

  private _value: string = '';

  /**
   * The default value of the input field.
   *
   * You can fetch the current value of the text input by accessing this property directly on the component instance, or by listening for the `change` or `input` events which are dispatched whenever the value changes.
   *
   * This attribute conforms with the standard HTML `value` attribute for input fields.
   * See: {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#value}
   *
   * @type {string}
   */
  @property({ type: String })
  get value(): string {
    return this._value;
  }

  set value(newValue: string) {
    const oldValue = this._value;
    this._value = newValue;
    this.requestUpdate('value', oldValue);
    this._internals.setFormValue(this._value);
  }

  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._internals.setFormValue(this.value);
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

  private handleChange(event: Event): void {
    event.stopPropagation();
    this._dispatchChangeEvent();
  }

  private handleInput(event: Event): void {
    this.value = this._input.value;
    this._internals.setFormValue(this.value);

    event.stopPropagation();
    this._dispatchInputEvent();
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this._internals.form) {
      this._internals.form!.requestSubmit();
    }
  }

  public formResetCallback(): void {
    this.value = this.getAttribute('value') || '';
    this._internals.setFormValue(this.value);
  }

  render() {
    return html`
      ${this.label && html`<label for="input-element">${this.label}</label>`}
      <input
        id="input-element"
        name=${ifDefined(this.name)}
        placeholder=${ifDefined(this.placeholder)}
        .value=${this.value}
        ?readonly=${this.readonly}
        ?disabled=${this.disabled}
        @change=${this.handleChange}
        @input=${this.handleInput}
        @keydown=${this.handleKeyDown}
      />
      ${this.message ? html`<p class="message">${this.message}</p>` : ''}
    `;
  }

  static styles = css`
    :host {
      --typography-font-family: var(--fhi-font-family-default);

      --opacity-disabled: var(--fhi-opacity-disabled);

      /* label */
      --color-label-text: var(--fhi-color-neutral-text-default);
      --color-label-text-error: var(--fhi-color-danger-text-default);

      --typography-label-font-weight: var(
        --fhi-typography-label-small-font-weight
      );
      --typography-label-font-size: var(--fhi-typography-label-small-font-size);
      --typography-label-line-height: var(
        --fhi-typography-label-small-line-height
      );
      --typography-label-letter-spacing: var(
        --fhi-typography-label-small-letter-spacing
      );

      --dimension-label-padding-bottom: var(--fhi-spacing-050);

      /* input */
      --color-input-placeholder: var(--fhi-color-neutral-base-default);
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
      -webkit-font-smoothing: antialiased;

      label {
        font-weight: var(--typography-label-font-weight);
        font-size: var(--typography-label-font-size);
        line-height: var(--typography-label-line-height);
        letter-spacing: var(--typography-label-letter-spacing);
        color: var(--color-label-text);
        padding-bottom: var(--dimension-label-padding-bottom);
      }

      input {
        box-sizing: border-box;
        height: var(--dimension-input-height);
        border: var(--dimension-input-border-width) solid
          var(--color-input-border);
        border-radius: var(--dimension-input-border-radius);
        padding: 0 var(--dimension-input-padding-right) 0
          var(--dimension-input-padding-left);
        color: var(--color-input-text);
        background-color: var(--color-input-background);
        font-family: var(--typography-font-family);
        font-weight: var(--typography-input-font-weight);
        font-size: var(--typography-input-font-size);
        line-height: var(--typography-input-line-height);
        letter-spacing: var(--typography-input-letter-spacing);
        transition: var(--motion-input-transition);
        &:hover {
          border-color: var(--color-input-border-hover);
          background-color: var(--color-input-background-hover);
        }
        &:focus {
          border-color: var(--color-input-border-active);
          background-color: var(--color-input-background-active);
        }
        &::placeholder {
          color: var(--color-input-placeholder);
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
    }

    :host([disabled]) {
      opacity: var(--opacity-disabled);
      cursor: not-allowed;
      * {
        cursor: not-allowed;
      }
      input {
        &:hover {
          border-color: var(--color-input-border);
          background-color: var(--color-input-background);
        }
      }
    }

    :host([readonly]:not([disabled])) {
      input {
        border: unset;
        border-radius: unset;
        background-color: unset;
        border-left: var(--dimension-input-border-width) solid
          var(--color-input-border);
      }
    }

    :host([status='error']:not([disabled]):not([readonly])) {
      label {
        color: var(--color-label-text-error);
      }
      input {
        border-color: var(--color-input-border-error);
        background-color: var(--color-input-background-error);
        color: var(--color-input-text-error);
      }
      .message {
        color: var(--color-message-text-error);
      }
    }
  `;
}
