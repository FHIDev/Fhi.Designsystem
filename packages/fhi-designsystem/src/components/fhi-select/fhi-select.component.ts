import { html, css, LitElement } from 'lit';
import {
  customElement,
  property,
  queryAssignedElements,
  query,
} from 'lit/decorators.js';
import { FhiSelectItem } from './fhi-select-item.component';

export const FhiSelectSelector = 'fhi-select';

@customElement(FhiSelectSelector)
export class FhiSelect extends LitElement {
  /** @internal */
  static readonly formAssociated = true;

  /**
   * The name attribute of the select element. This property is used to identify the select element when submitting a form.
   * @type {string}
   */
  @property({ type: String, reflect: true }) name: string = '';

  @property({ type: String })
  value = '';

  @query('select')
  selectElement!: HTMLSelectElement;

  @queryAssignedElements()
  slotElements!: Array<HTMLElement>;

  private _internals: ElementInternals;
  private _initialSelectedElement: FhiSelectItem | null = null;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  public updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('name')) {
      this._internals.setFormValue(this.value);
    }
  }

  public formResetCallback(): void {
    this.value = this._initialSelectedElement?.value ?? '';
    this._internals.setFormValue(this.value);
  }

  private _handleSelectChange(): void {
    this.value = this.selectElement.value;
    this._internals.setFormValue(this.value);

    this._dispatchChangeEvent();
  }

  private _handleSelectInput(): void {
    this._dispatchInputEvent();
  }

  private _dispatchChangeEvent(): void {
    console.log('Dispatching change event');
    /**
     * @type {Event} - Standard DOM event with the type `change`.
     * This event is dispatched when the chosen option of the select changes.
     */
    this.dispatchEvent(
      new Event('change', {
        bubbles: true,
      }),
    );
  }

  private _dispatchInputEvent(): void {
    console.log('Dispatching input event');
    /**
     * @type {Event} - Standard DOM event with the type `input`.
     * This event is dispatched when the chosen option of the select changes.
     */
    this.dispatchEvent(
      new Event('input', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _renderOptionElements() {
    const items = this.slotElements.filter(
      element => element.tagName.toLowerCase() === 'fhi-select-item',
    ) as FhiSelectItem[];

    if (items.length === 0) {
      return html``;
    }

    let selectedElement: FhiSelectItem | undefined = undefined;

    const options = html`
      ${items.map(item => {
        if (item.hasAttribute('selected')) {
          selectedElement = item;
        }

        return html`<option
          value="${item.getAttribute('value') ?? item.textContent}"
          label="${item.getAttribute('label') ?? ''}"
          ?selected="${item.hasAttribute('selected')}"
        >
          ${item.textContent}
        </option>`;
      })}
    `;

    if (selectedElement !== undefined) {
      this._initialSelectedElement = selectedElement;
    } else {
      this._initialSelectedElement =
        items.find(item => item.hasAttribute('selected')) ?? null;
    }

    return options;
  }

  private _handleSlotChange() {
    this.requestUpdate();

    this.updateComplete.then(() => {
      this.value = this.selectElement.value;
      this._internals.setFormValue(this.value);
    });
  }

  render() {
    return html`
      <slot hidden @slotchange=${this._handleSlotChange}></slot>
      <select
        name="${this.name}"
        .value="${this.value}"
        @change="${this._handleSelectChange}"
        @input="${this._handleSelectInput}"
      >
        ${this._renderOptionElements()}
      </select>
    `;
  }

  static styles = css``;
}
