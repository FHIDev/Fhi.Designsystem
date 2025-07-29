import { html, css, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

export const FhiRadioSelector = 'fhi-radio';

@customElement(FhiRadioSelector)
export class FhiRadio extends LitElement {
  static readonly formAssociated = true;

  @property({ type: String }) label: string = 'label';

  @property({ type: String }) name?: string = undefined;

  @property({ type: String, reflect: true }) status?: 'error' = undefined;

  @property({ type: Boolean, reflect: true }) disabled? = false;

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
      <div id="radio-container">
        <input
          type="radio"
          id="input-element"
          name="${this.name}"
          .value="${this.name}"
          ?checked=${this.checked}
          @change=${this.handleChange}
        />
        <svg
          class="radio-dot"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle r="6" cx="9" cy="9" />
        </svg>
      </div>
      <label for="input-element">${this.label}</label>
    `;
  }

  static styles = css`
    :host {
      --color-radio-border: var(--fhi-color-neutral-border-default);
      --color-radio-label: var(--fhi-color-neutral-text-default);
      --color-radio-background: var(--fhi-color-neutral-background-default);

      --color-radio-border-hover: var(--fhi-color-accent-border-strong);
      --color-radio-label-hover: var(--fhi-color-accent-border-strong);
      --color-radio-background-hover: var(--fhi-color-accent-background-subtle);

      --color-radio-outline: var(--fhi-color-accent-surface-default);

      /* Error state */
      --color-radio-label-error: var(--fhi-color-neutral-text-default);
      --color-radio-border-error: var(--fhi-color-danger-border-default);
      --color-radio-background-error: var(
        --fhi-color-danger-background-default
      );
    }

    :host {
      display: flex;
      align-items: center;
      width: max-content;
      gap: 0.5rem;

      #radio-container {
        position: relative;
      }

      input {
        margin: 0;
        appearance: none;
        width: 1.25rem;
        height: 1.25rem;
        background-color: var(--color-radio-background);
        border: 0.0625rem solid var(--color-radio-border);
        border-radius: 50%;
      }
      .radio-dot {
        visibility: hidden;
        position: absolute;
        top: 1px;
        left: 1px;
      }

      input:checked {
        border-width: 2px;
        ~ .radio-dot {
          circle {
            fill: var(--color-radio-border);
          }
          visibility: visible;
        }
      }
    }

    :host(:hover) {
      input:not(:checked) {
        border-color: var(--color-radio-border-hover);
        background-color: var(--color-radio-background-hover);
      }
    }

    :host(:active) {
      input:not(:checked) {
        outline: 0.25rem solid var(--color-radio-outline);
      }
    }

    :host[status='error'] {
    }

    :host([disabled]) {
    }
  `;
}
