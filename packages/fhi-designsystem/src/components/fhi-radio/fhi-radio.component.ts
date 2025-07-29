import { html, css, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

export const FhiRadioSelector = 'fhi-radio';

@customElement(FhiRadioSelector)
export class FhiRadio extends LitElement {
  static readonly formAssociated = true;

  @property({ type: String }) label: string = 'label';

  @property({ type: String }) name?: string = undefined;

  @property({ type: Boolean, reflect: true }) checked? = false;

  @query('#input-element') _input!: HTMLInputElement;

  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  public connectedCallback(): void {
    super.connectedCallback();

    this.setFormValue();
  }

  public updated(changedProps: Map<string, unknown>) {
    super.updated(changedProps);

    // make sure the radio input can be programmatically toggeled
    if (changedProps.has('checked')) {
      this._input.checked = !!this.checked;
      this.setFormValue();
    }
  }

  private setFormValue(): void {
    this._internals.setFormValue(this.checked ? 'on' : null);
  }

  private handleChange(event: Event): void {
    this.checked = (event.target as HTMLInputElement).checked;

    this.setFormValue();

    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  render() {
    if (!this.label) {
      console.error(
        `Invalid label attribute! There is an <${FhiRadioSelector}> without an accessable label on this page`,
      );
    }

    return html`
      <input
        type="radio"
        id="input-element"
        name="${this.name}"
        .value="${this.name}"
        ?checked=${this.checked}
        @change=${this.handleChange}
      />
      <label for="input-element">${this.label}</label>
    `;
  }

  static styles = css``;
}
