import { html, css, LitElement } from 'lit';
import {
  customElement,
  property,
  queryAssignedElements,
  query,
} from 'lit/decorators.js';

import { FhiSelectItem } from '../fhi-select-item/fhi-select-item.component';

import '../../typography/fhi-label/fhi-label.component';
import '../../typography/fhi-body/fhi-body.component';
import '../../icons/fhi-icon-chevron-down.component';

export const FhiSelectSelector = 'fhi-select';

/**
 * ## FHI Select
 *
 * {@link https://designsystem.fhi.no/?path=/docs/komponenter-select--docs}
 *
 * The `<fhi-select>` component is used to create a dropdown list of options for users to choose from.
 * It provides a labeled select element (`fhi-select-item`) with optional placeholder text, status indication, and a message area for additional information or validation feedback.
 *
 * @tag fhi-select
 * @element fhi-select
 *
 * @slot - The default slot is used to provide the options for the select element. Each option should be represented by a `<fhi-select-item>` element.
 */
@customElement(FhiSelectSelector)
export class FhiSelect extends LitElement {
  /** @internal */
  static readonly formAssociated = true;

  /**
   * The name attribute of the select element. This property is used to identify the select element when submitting a form.
   * @type {string}
   */
  @property({ type: String, reflect: true })
  name: string = '';

  /**
   * The label attribute of the select element. This property is used to provide a descriptive label for the select element.
   * @type {string}
   */
  @property({ type: String })
  label: string = '';

  /**
   * The value attribute of the select element. This property is used to identify the selected option when submitting a form.
   * @type {string}
   */
  @property({ type: String, reflect: true })
  value: string = '';

  /**
   * The disabled attribute of the select element. This property is used to disable the select element.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  /**
   * The status attribute of the select element. This property is used to indicate the validation status of the select element.
   * @type {'error' | undefined}
   */
  @property({ type: String, reflect: true })
  status?: 'error';

  /**
   * The message attribute of the select element. This property is used to provide a validation message for the select element.
   * @type {string}
   */
  @property({ type: String })
  message?: string;

  @query('select')
  selectElement!: HTMLSelectElement;

  @queryAssignedElements()
  slotElements!: Array<HTMLElement>;

  private _internals: ElementInternals;
  private _initialSelectedElement: HTMLOptionElement | null = null;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  public updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('name')) {
      this._internals.setFormValue(this.value);
    }

    if (!this._initialSelectedElement) {
      this._setInitialSelectedElement();
    }
  }

  private _setInitialSelectedElement() {
    this.selectElement.querySelectorAll('option').forEach(option => {
      if (option.selected) {
        this._initialSelectedElement = option;
      }
    });
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

    const options = html`
      ${items.map(item => {
        return html`<option
          value="${item.getAttribute('value') ?? item.textContent}"
          label="${item.getAttribute('label') ?? ''}"
          ?selected="${item.hasAttribute('selected')}"
        >
          ${item.textContent}
        </option>`;
      })}
    `;

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
      ${this.label
        ? html`
            <label for="select">
              <fhi-label class="label" size="small">${this.label}</fhi-label>
            </label>
          `
        : null}

      <div class="select-wrapper">
        <fhi-icon-chevron-down aria-hidden="true"></fhi-icon-chevron-down>
        <select
          id="select"
          name="${this.name}"
          .value="${this.value}"
          @change="${this._handleSelectChange}"
          @input="${this._handleSelectInput}"
          ?disabled="${this.disabled}"
        >
          ${this._renderOptionElements()}
        </select>
      </div>

      ${this.message
        ? html`<fhi-body class="message" size="small"
            >${this.message}</fhi-body
          >`
        : null}

      <slot hidden @slotchange=${this._handleSlotChange}></slot>
    `;
  }

  static styles = css`
    :host {
      display: block;
      width: fit-content;
      color: var(--fhi-color-neutral-text-default);

      .label {
        color: inherit;
        width: fit-content;
        padding-bottom: var(--fhi-spacing-050);
      }

      .message {
        color: inherit;
        width: fit-content;
        padding-top: var(--fhi-spacing-050);
      }

      .select-wrapper {
        position: relative;
        display: inline-flex;
      }

      fhi-icon-chevron-down {
        color: inherit;
        position: absolute;
        pointer-events: none;
        align-self: center;
        right: 8px;
      }

      /* TODO: Use customizable select styling when available. */
      /* https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select#browser_compatibility */
      select {
        color: inherit;
        box-sizing: border-box;

        font: normal var(--fhi-typography-body-medium-font-weight)
          var(--fhi-typography-body-medium-font-size) /
          var(--fhi-typography-body-medium-line-height)
          var(--fhi-font-family-default);

        background-color: var(--fhi-color-neutral-background-default);
        border: var(--fhi-dimension-border-width) solid
          var(--fhi-color-neutral-border-default);
        border-radius: var(--fhi-border-radius-050);
        padding: var(--fhi-spacing-100) var(--fhi-spacing-500)
          var(--fhi-spacing-100) var(--fhi-spacing-150);

        appearance: none;
        field-sizing: content;
      }
    }

    :host([disabled]) {
      opacity: var(--fhi-opacity-disabled);

      * {
        cursor: not-allowed;
      }
    }

    :host([status='error']:not([disabled])) {
      .label,
      .message,
      select {
        color: var(--fhi-color-danger-text-default);
      }

      select {
        border-color: var(--fhi-color-danger-border-strong);
        background-color: var(--fhi-color-danger-background-default);
      }
    }

    :host(:not([status]):not([disabled])) {
      select:not(:open) {
        transition: all var(--fhi-motion-ease-default)
          var(--fhi-motion-duration-quick);
        &:hover {
          border-color: var(--fhi-color-accent-border-default);
          background-color: var(--fhi-color-accent-background-subtle);
        }
      }
    }
  `;
}
