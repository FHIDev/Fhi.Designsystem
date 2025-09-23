import { html, css, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
export const FhiDateInputSelector = 'fhi-date-input';

export type FhiDateValue = `${number}-${number}-${number}` | undefined; // YYYY-MM-DD
/**
 * @tag fhi-date-input
 */
@customElement(FhiDateInputSelector)
export class FhiDateInput extends LitElement {
  static readonly formAssociated = true;

  @property({ type: String }) label?: string = undefined;

  @property({ type: String }) message?: string = undefined;

  @property({ type: String }) minDate?: FhiDateValue = undefined;

  @property({ type: String }) maxDate?: FhiDateValue = undefined;

  @property({ type: String, reflect: true }) status?: 'error' = undefined;

  @property({ type: Boolean, reflect: true }) readonly? = false;

  @property({ type: Boolean, reflect: true }) disabled? = false;

  @query('#input-element') _input!: HTMLInputElement;

  private _name?: string | undefined = undefined;

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

  public onChange(): void {
    this.dispatchEvent(
      new Event('change', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  public onInput(): void {
    this.value = this._input.value as FhiDateValue;
    this._internals.setFormValue(this.value ?? null);
  }

  public onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this._internals.form) {
      this._internals.form!.requestSubmit();
    }
  }

  public formResetCallback(): void {
    this.value = this.getAttribute('value') as FhiDateValue;
    this._internals.setFormValue(this.value ?? null);
  }

  render() {
    return html`
      ${this.label && html`<label for="input-element">${this.label}</label>`}
      <input
        type="date"
        id="input-element"
        name=${ifDefined(this.name)}
        min=${ifDefined(this.minDate)}
        max=${ifDefined(this.maxDate)}
        value=${ifDefined(this.value)}
        ?readonly=${this.readonly}
        ?disabled=${this.disabled}
        @change=${this.onChange}
        @input=${this.onInput}
        @keydown=${this.onKeyDown}
      />
      ${this.message && html`<p class="message">${this.message}</p>`}
    `;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    [FhiDateInputSelector]: FhiDateInput;
  }
}
