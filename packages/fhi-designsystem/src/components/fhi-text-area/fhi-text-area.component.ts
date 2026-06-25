import { html, css, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../typography/fhi-body/fhi-body.component';
import '../typography/fhi-label/fhi-label.component';

export const FhiTextAreaSelector = 'fhi-text-area';

/**
 * ## FHI Text Area
 *
 * {@link https://designsystem.fhi.no/?path=/docs/komponenter-text-area--docs}
 *
 * The `<fhi-text-area>` component is used to collect user input in forms.
 * It provides a labeled text area with optional placeholder text, status indication, and a message area for additional information or validation feedback.
 *
 * @tag fhi-text-area
 * @element fhi-text-area
 */
@customElement(FhiTextAreaSelector)
export class FhiTextArea extends LitElement {
  static readonly formAssociated = true;

  /**
   * The text that labels the text area.
   * A text area should always have a label to ensure accessibility.
   * @type {string}
   */
  @property({ type: String }) label?: string = undefined;

  /**
   * The message shown beneath the text area.
   * This is often used to provide additional information or feedback to the user.
   * @type {string}
   */
  @property({ type: String }) message?: string = undefined;

  /**
   * The message shown above the text area.
   * This is often used to provide additional information to the user.
   * @type {string}
   */
  @property({ type: String, attribute: 'help-text' }) helpText?: string =
    undefined;

  /**
   * Sets the placeholder text for the text area.
   * This text is displayed when the text area is empty, providing a hint to the user about the expected input.
   * @type {string}
   */
  @property({ type: String }) placeholder?: string = undefined;

  /**
   * Sets the visual status of the text area. There is currently only one status available: `error`.
   *
   * The `error` status is used to indicate that there is an issue with the text area, such as invalid or missing data.
   * @reflect
   * @type {'error'}
   */
  @property({ type: String, reflect: true }) status?: 'error' = undefined;

  /**
   * Sets the text area to read-only. A read-only field cannot be modified by the user but may be submitted with the form.
   * @reflect
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) readonly? = false;

  /**
   * Disables the text area.  This changes its appearance and makes it non-interactive.
   * @reflect
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) disabled? = false;

  /**
   * Sets the number of visible text lines for the text area.
   * @reflect
   * @type {number}
   */
  @property({ type: Number, reflect: true }) rows? = 2;

  @query('#textarea-element')
  private _textarea!: HTMLTextAreaElement;

  private _name?: string = undefined;

  /**
   * The name of the text area. This is submitted with the form data as a `key`.
   *
   * This attribute conforms with the standard HTML `name` attribute for text areas.
   * See: {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#name}
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
   * The default value of the text area.
   *
   * You can fetch the current value of the text area by accessing this property directly on the component instance, or by listening for the `change` or `input` events which are dispatched whenever the value changes.
   *
   * This attribute conforms with the standard HTML `value` attribute for text areas.
   * See: {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement/value}
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
     * This event is dispatched when the value of the text area changes.
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
    this.value = this._textarea.value;
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

  private _handleActionIconSlotChange(event: Event): void {
    const iconNode: Node = (event.target as HTMLSlotElement).assignedNodes()[0];

    if (
      iconNode.nodeType === Node.ELEMENT_NODE &&
      (iconNode as Element).tagName.toLowerCase().startsWith('fhi-icon')
    ) {
      const icon = iconNode as HTMLElement;
      this._textarea.style.paddingRight = 'var(--fhi-spacing-500)';
      icon.setAttribute('size', '1.5rem');
    } else {
      console.error(
        'Invalid slot input. Fhi-text-area only accepts FHI Designsystem icons.',
      );
    }
  }

  render() {
    return html`
      ${this.label &&
      html`<fhi-label size="small"
        ><label for="textarea-element">${this.label}</label></fhi-label
      >`}
      ${this.helpText
        ? html`<fhi-body size="small" class="help-text"
            >${this.helpText}</fhi-body
          >`
        : ''}
      <div class="textarea-container">
        <textarea
          id="textarea-element"
          name=${ifDefined(this.name)}
          placeholder=${ifDefined(this.placeholder)}
          .value=${this.value}
          ?readonly=${this.readonly}
          ?disabled=${this.disabled}
          rows=${ifDefined(this.rows)}
          @change=${this.handleChange}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
        ></textarea>
        <slot
          name="action-icon"
          @slotchange=${this._handleActionIconSlotChange}
        >
        </slot>
      </div>
      ${this.message
        ? html`<fhi-body size="small" class="message"
            >${this.message}</fhi-body
          >`
        : ''}
    `;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      font-family: var(--fhi-font-family-default);
      -webkit-font-smoothing: antialiased;

      textarea {
        box-sizing: border-box;
        width: auto;
        border: var(--fhi-dimension-border-width) solid
          var(--fhi-color-neutral-border-default);
        border-radius: var(--fhi-border-radius-050);
        padding: var(--fhi-spacing-100);
        color: var(--fhi-color-neutral-text-default);
        background-color: var(--fhi-color-neutral-background-default);
        font-family: var(--fhi-font-family-default);
        font-weight: var(--fhi-typography-body-medium-font-weight);
        font-size: var(--fhi-typography-body-medium-font-size);
        line-height: var(--fhi-typography-body-medium-line-height);
        letter-spacing: var(--fhi-typography-body-medium-letter-spacing);

        &:hover {
          border-color: var(--fhi-color-accent-border-default);
          background-color: var(--fhi-color-accent-background-subtle);
        }
        &:focus {
          border-color: var(--fhi-color-accent-border-strong);
          background-color: var(--fhi-color-accent-background-default);
        }
        &::placeholder {
          color: var(--fhi-color-neutral-base-default);
        }
      }

      .textarea-container {
        position: relative;
        display: flex;
        width: fit-content;
      }

      label {
        color: var(--fhi-color-neutral-text-default);
        margin: 0 0 var(--fhi-spacing-050) 0;
      }

      label:has(+ p) {
        margin: 0 0 0 0;
      }

      .help-text {
        color: var(--fhi-color-neutral-text-subtle);
        margin: 0 0 var(--fhi-spacing-050) 0;
      }

      .message {
        margin: var(--fhi-spacing-050) 0 0 0;
        color: var(--fhi-color-neutral-text-default);
      }
    }

    :host([disabled]) {
      opacity: var(--fhi-opacity-disabled);
      cursor: not-allowed;
      label,
      textarea {
        cursor: not-allowed;
      }
      textarea {
        &:hover {
          border-color: var(--fhi-color-neutral-border-default);
          background-color: var(--fhi-color-neutral-background-default);
        }
      }
    }

    :host([readonly]:not([disabled])) {
      textarea {
        border: unset;
        border-radius: unset;
        background-color: unset;
        border-left: var(--fhi-dimension-border-width) solid
          var(--fhi-color-neutral-border-default);
      }
    }

    :host([status='error']:not([disabled]):not([readonly])) {
      label {
        color: var(--fhi-color-danger-text-default);
      }
      textarea {
        border-color: var(--fhi-color-danger-border-strong);
        background-color: var(--fhi-color-danger-background-default);
        color: var(--fhi-color-neutral-text-default);
      }
      .message {
        color: var(--fhi-color-danger-text-subtle);
      }
      .help-text {
        color: var(--fhi-color-danger-text-default);
      }
    }

    slot[name='action-icon'] {
      position: absolute;
      display: block;
      right: var(--fhi-spacing-100);
      top: var(--fhi-spacing-200);
      transform: translateY(-50%);
      pointer-events: none;
      color: var(--fhi-color-neutral-text-subtle);
    }
  `;
}
