import { html, css, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export const FhiRadioSelector = 'fhi-radio';

/**
 * ## FHI Radio
 *
 * {@link https://designsystem.fhi.no/?path=/docs/komponenter-radio--docs}
 *
 * The `<fhi-radio>` component represents a single radio button.
 * It should be used within a group of options, allowing users to select one option from a set.
 *
 * @tag fhi-radio
 * @element fhi-radio
 */
@customElement(FhiRadioSelector)
export class FhiRadio extends LitElement {
  static readonly formAssociated = true;

  /**
   * The text label displayed next to the radio button.
   * You should always provide a label for the radio button.
   * @type {string}
   */
  @property({ type: String }) label?: string = undefined;

  /**
   * The name of the radio. This is submitted with the form data as a `key` when the checkbox is checked.
   * All `<fhi-radio>` components with the same name belong to the same group.
   * @reflect
   * @type {string}
   */
  @property({ type: String, reflect: true }) name?: string = undefined;

  /**
   * Sets the visual status of the radio. There is currently only one status available: `error`.
   * The `error` status is used to indicate that there is an issue with the radio, such as a required radio not being checked.
   * @reflect
   * @type {'error' | undefined}
   */
  @property({ type: String, reflect: true }) status?: 'error' = undefined;

  /**
   * Disables the radio. This changes its appearance and makes it non-interactive.
   * @reflect
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) disabled? = false;

  /**
   * Whether the radio button is checked or not.
   * @attr
   * @type {boolean}
   */
  @property({ type: Boolean }) checked? = false;

  /**
   * The value of the radio. This is submitted with the form data as a `value` when the radio is checked.
   * @type {string}
   */
  @property({ type: String }) value: string = 'on';

  @query('#input-element')
  private _input!: HTMLInputElement;

  private _groupRoot: Document | HTMLFormElement;
  private _internals: ElementInternals;

  /**
   * Indicates if the radio button is part of a form.
   * @internal
   */
  public isFormElement = false;

  constructor() {
    super();
    this._internals = this.attachInternals();
    this._groupRoot = document;
  }

  public connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('focus', this._setFocusOnInput);

    this.isFormElement = !!this._internals.form;

    if (this.isFormElement) {
      this._updateFormValue();
      this._groupRoot = this._internals.form!;
    }

    // If the radio has a name then it is part of a group and needs keyboard navigation
    if (this.name) {
      this.addEventListener('keydown', this._handleKeyDown);
      this._SetTabbableRadios();
    }
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeyDown);
    this.removeEventListener('focus', this._setFocusOnInput);
  }

  private _setFocusOnInput() {
    this._input.focus();
  }

  private _getRadioGroup() {
    return Array.from(
      this._groupRoot.querySelectorAll<FhiRadio>(
        `${FhiRadioSelector}[name="${this.name}"]`,
      ),
    );
  }

  private _SetTabbableRadios() {
    const radios = this._getRadioGroup();

    radios.forEach(radio => {
      // Only the checked radio should be tabbable
      radio.tabIndex = radio.checked ? 0 : -1;
    });

    // If none of the radios are checked, make the first one tabbable
    if (!radios.some(radio => radio.checked) && radios.length > 0) {
      radios[0].tabIndex = 0;
    }
  }

  public updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    // make sure the radio input can be programmatically toggeled. e.g by a form reset
    if (changedProperties.has('checked')) {
      this._input.checked = !!this.checked;
      this._updateFormValue();

      if (this.checked) {
        this.uncheckGroupMembers();
      }
    }

    // update the form value when the value or name input changes and the radio is already checked
    if (changedProperties.has('value') || changedProperties.has('name')) {
      if (this._input.checked) {
        this._updateFormValue();
      }
    }
  }

  public formResetCallback(): void {
    const radiosCheckedByDefault = this._getRadioGroup().filter(
      radio => typeof radio.getAttribute('checked') === 'string',
    );

    if (radiosCheckedByDefault.pop() === this) {
      this.checked = true;
    }

    this._updateFormValue();
  }

  private uncheckGroupMembers(): void {
    const radios = this._getRadioGroup();

    radios.forEach(radio => {
      if (radio === this) {
        return;
      }

      if (radio.isFormElement && this._groupRoot === document) {
        return;
      }

      radio.checked = false;
    });
  }

  private _updateFormValue(): void {
    if (!this.isFormElement) {
      return;
    }

    this._internals.setFormValue(this.checked ? this.value : null);
  }

  private _handleChange(event: Event): void {
    this.checked = (event.target as HTMLInputElement).checked;

    this.uncheckGroupMembers();

    this._updateFormValue();

    event.stopPropagation();
    this._dispatchChangeEvent();
  }
  private _handleInput(event: Event): void {
    event.stopPropagation();
    this._dispatchInputEvent();
  }

  private _dispatchChangeEvent(): void {
    /**
     * @type {Event} - Standard DOM event with the type `change`.
     * This event is dispatched when the radio is checked or unchecked.
     */
    this.dispatchEvent(new Event('change', { bubbles: true }));
  }

  private _dispatchInputEvent(): void {
    /**
     * @type {Event} - Standard DOM event with the type `input`.
     * This event is dispatched when the radio is checked or unchecked.
     */
    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
  }

  private _handleKeyDown(event: KeyboardEvent): void {
    const arrows = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

    if (!arrows.includes(event.key)) {
      return;
    }

    event.preventDefault();

    const radios = this._getRadioGroup();

    if (radios.length < 2) {
      return;
    }

    const currentIndex = radios.indexOf(this);

    const nextIndex = currentIndex;
    let nextRadio: FhiRadio;

    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      nextRadio = radios[nextIndex === 0 ? radios.length - 1 : nextIndex - 1];
    } else {
      nextRadio = radios[nextIndex === radios.length - 1 ? 0 : nextIndex + 1];
    }

    nextRadio.focus();
    this.checked = false;
    nextRadio.checked = true;
    this._SetTabbableRadios();
  }

  render() {
    return html`
      <label>
        <div class="radio-container">
          <input
            type="radio"
            id="input-element"
            name="${ifDefined(this.name)}"
            value="${this.value}"
            ?checked=${this.checked}
            ?disabled=${this.disabled}
            @change=${this._handleChange}
            @input=${this._handleInput}
          />
          <svg
            class="radio-dot"
            viewBox="0 0 18 18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle r="6" cx="9" cy="9" />
          </svg>
        </div>
        ${this.label}
      </label>
    `;
  }

  static styles = css`
    :host {
      --motion-radio-transition: var(--fhi-motion-ease-default)
        var(--fhi-motion-duration-quick);

      --color-radio-label: var(--fhi-color-neutral-text-default);
      --color-radio-border: var(--fhi-color-neutral-border-default);
      --color-radio-background: var(--fhi-color-neutral-background-default);

      --color-radio-border-hover: var(--fhi-color-accent-border-strong);
      --color-radio-background-hover: var(--fhi-color-accent-background-subtle);

      --color-radio-background-active: var(--fhi-color-accent-surface-default);

      --color-radio-outline: var(--fhi-color-accent-surface-hover);

      --typography-radio-label-font-family: var(--fhi-font-family-default);
      -webkit-font-smoothing: antialiased;
      --typography-radio-label-font-size: var(
        --fhi-typography-body-medium-font-size
      );

      --typography-radio-label-font-weight: var(
        --fhi-typography-body-medium-font-weight
      );

      --typography-radio-label-line-height: var(
        --fhi-typography-body-medium-line-height
      );
      --typography-radio-label-letter-spacing: var(
        --fhi-typography-body-medium-letter-spacing
      );

      --dimension-radio-label-gap: var(--fhi-spacing-050);
      --dimension-radio-width: var(--fhi-spacing-250);
      --dimension-radio-height: var(--fhi-spacing-250);
      --dimension-radio-margin: 0.125rem;
      --dimension-radio-border-width: var(--fhi-dimension-border-width);

      --dimension-radio-dot-size: 1.125rem;

      /* Checked state */
      --dimension-radio-border-width-checked: var(
        --fhi-dimension-border-width-active
      );

      /* Error state */
      --color-radio-border-error: var(--fhi-color-danger-border-default);
      --color-radio-background-error: var(
        --fhi-color-danger-background-default
      );

      --color-radio-border-error-hover: var(--fhi-color-danger-border-strong);
      --color-radio-background-error-hover: var(
        --fhi-color-danger-background-subtle
      );

      --color-radio-background-error-active: var(
        --fhi-color-danger-surface-default
      );

      --color-radio-outline-error: var(--fhi-color-danger-surface-hover);

      /* Disabled state */
      --opacity-disabled: var(--fhi-opacity-disabled);
    }

    :host {
      display: flex;
      align-items: center;
      width: max-content;

      label {
        display: flex;
        position: relative;
        gap: var(--dimension-radio-label-gap);
        color: var(--color-radio-label);
        font-family: var(--typography-radio-label-font-family);
        font-size: var(--typography-radio-label-font-size);
        font-weight: var(--typography-radio-label-font-weight);
        line-height: var(--typography-radio-label-line-height);
        letter-spacing: var(--typography-radio-label-letter-spacing);
      }

      .radio-container {
        display: flex;
        position: relative;
      }

      input {
        appearance: none;
        margin: var(--dimension-radio-margin);
        width: var(--dimension-radio-width);
        height: var(--dimension-radio-height);
        background-color: var(--color-radio-background);
        border: var(--dimension-radio-border-width) solid
          var(--color-radio-border);
        border-radius: var(--fhi-border-radius-full);
        transition: all var(--motion-radio-transition);
      }

      .radio-dot {
        visibility: hidden;
        opacity: 0;
        transition: opacity var(--motion-radio-transition);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: var(--dimension-radio-dot-size);
        width: var(--dimension-radio-dot-size);
      }

      input:checked {
        border-width: var(--dimension-radio-border-width-checked);
        ~ .radio-dot {
          circle {
            fill: var(--color-radio-border);
          }
          visibility: visible;
          opacity: 1;
        }
      }
    }

    :host([disabled]) {
      opacity: var(--opacity-disabled);
    }

    :host(:not(:disabled)) {
      input:hover:not(:checked) {
        border-color: var(--color-radio-border-hover);
        background-color: var(--color-radio-background-hover);
      }

      input:active:not(:checked) {
        border-color: var(--color-radio-border-hover);
        background-color: var(--color-radio-background-active);
        outline: var(--fhi-dimension-border-width-focus) solid
          var(--color-radio-outline);
      }
    }

    :host([status='error']) {
      input {
        border-color: var(--color-radio-border-error);
        background-color: var(--color-radio-background-error);
      }

      input:checked {
        ~ .radio-dot {
          circle {
            fill: var(--color-radio-border-error);
          }
        }
      }
    }

    :host([status='error']:not(:disabled)) {
      input:hover:not(:checked) {
        border-color: var(--color-radio-border-error-hover);
        background-color: var(--color-radio-background-error-hover);
      }

      input:active:not(:checked) {
        border-color: var(--color-radio-border-error-hover);
        background-color: var(--color-radio-background-error-active);
        outline-color: var(--color-radio-outline-error);
      }
    }
  `;
}
