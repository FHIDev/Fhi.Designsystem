import { html, css, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

export const FhiRadioSelector = 'fhi-radio';

@customElement(FhiRadioSelector)
export class FhiRadio extends LitElement {
  static readonly formAssociated = true;

  @property({ type: String }) label?: string = undefined;

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

    this._setFormValue();
  }

  public updated(changedProps: Map<string, unknown>) {
    super.updated(changedProps);

    // make sure the radio input can be programmatically toggeled. e.g by a form reset
    if (changedProps.has('checked')) {
      this._input.checked = !!this.checked;
      this._setFormValue();
    }
  }

  public formResetCallback(): void {
    this.checked = !!this.getAttribute('checked');
    this._setFormValue();
  }

  private _setFormValue(): void {
    this._internals.setFormValue(this.checked ? 'on' : null);
  }

  private _handleChange(event: Event): void {
    this.checked = (event.target as HTMLInputElement).checked;

    this._setFormValue();

    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div id="radio-container">
        <input
          type="radio"
          id="input-element"
          name="${this.name}"
          .value="${this.name}"
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this._handleChange}
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
      ${this.label && html`<label for="input-element">${this.label}</label>`}
    `;
  }

  static styles = css`
    :host {
      --color-radio-label: var(--fhi-color-neutral-text-default);
      --color-radio-border: var(--fhi-color-neutral-border-default);
      --color-radio-background: var(--fhi-color-neutral-background-default);

      --color-radio-border-hover: var(--fhi-color-accent-border-strong);
      --color-radio-background-hover: var(--fhi-color-accent-background-subtle);

      --color-radio-outline: var(--fhi-color-accent-surface-default);

      --motion-radio-transition: var(--fhi-motion-ease-default)
        var(--fhi-motion-duration-quick);

      --typography-radio-label-font-family: var(--fhi-font-family-default);
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

      /* Error state */
      --color-radio-border-error: var(--fhi-color-danger-border-default);
      --color-radio-background-error: var(
        --fhi-color-danger-background-default
      );

      --color-radio-border-error-hover: var(--fhi-color-danger-border-strong);
      --color-radio-background-error-hover: var(
        --fhi-color-danger-surface-default
      );

      --color-radio-outline-error: var(--fhi-color-danger-surface-hover);

      --opacity-disabled: var(--fhi-opacity-disabled);
    }

    :host {
      display: flex;
      align-items: center;
      width: max-content;

      #radio-container {
        display: flex;
        position: relative;
      }

      label {
        padding-left: var(--fhi-spacing-100);
        color: var(--color-radio-label);
        font-family: var(--typography-radio-label-font-family);
        font-size: var(--typography-radio-label-font-size);
        font-weight: var(--typography-radio-label-font-weight);
        line-height: var(--typography-radio-label-line-height);
        letter-spacing: var(--typography-radio-label-letter-spacing);
      }

      input {
        margin: 0;
        appearance: none;
        width: var(--fhi-spacing-250);
        height: var(--fhi-spacing-250);
        background-color: var(--color-radio-background);
        border: var(--fhi-dimension-border-width) solid
          var(--color-radio-border);
        border-radius: var(--fhi-border-radius-full);
        transition: all var(--motion-radio-transition);
      }

      .radio-dot {
        visibility: hidden;
        opacity: 0;
        transition: opacity var(--motion-radio-transition);
        position: absolute;
        top: 1px;
        left: 1px;
      }

      input:checked {
        border-width: var(--fhi-dimension-border-width-active);
        ~ .radio-dot {
          circle {
            fill: var(--color-radio-border);
          }
          visibility: visible;
          opacity: 1;
        }
      }
    }

    :host(:hover:not(:disabled)) {
      input:not(:checked) {
        border-color: var(--color-radio-border-hover);
        background-color: var(--color-radio-background-hover);
      }
    }

    :host(:active:not(:disabled)) {
      input:not(:checked) {
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

    :host([status='error']:hover:not(:disabled)) {
      input:not(:checked) {
        border-color: var(--color-radio-border-error-hover);
        background-color: var(--color-radio-background-error-hover);
      }
    }

    :host([status='error']:active:not(:disabled)) {
      input:not(:checked) {
        outline-color: var(--color-radio-outline-error);
      }
    }

    :host([disabled]) {
      opacity: var(--opacity-disabled);
    }
  `;
}
