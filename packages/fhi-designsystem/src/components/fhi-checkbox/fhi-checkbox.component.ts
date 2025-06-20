import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiCheckboxSelector = 'fhi-checkbox';

@customElement(FhiCheckboxSelector)
export class FhiCheckbox extends LitElement {
  @property({ type: String, reflect: true }) id = '';
  @property({ type: String, reflect: true }) label = '';
  @property({ type: String, reflect: true }) status: 'error' | undefined;
  @property({ type: Boolean, reflect: true }) disabled? = false;

  render() {
    return html`
      <label>
        <input
          type="checkbox"
          name="checkbox"
          id="${this.id}"
          ?disabled="${this.disabled}"
        />
        ${this.label}
      </label>
    `;
  }
  static styles = css`
    :host {
      label {
        color: var(--fhi-color-neutral-text-default);
        font-family: var(--fhi-font-family-default);
        font-size: var(--fhi-typography-body-medium-font-size);
        font-weight: 400;
        line-height: var(--fhi-typography-body-medium-line-height);
        letter-spacing: var(--fhi-typography-body-medium-letter-spacing);
        display: grid;
        grid-template-columns: 1rem auto;
        gap: var(--fhi-spacing-150);
      }

      input[type='checkbox'] {
        appearance: none;
        width: 18px;
        height: 18px;
        background-color: var(--fhi-color-neutral-background-default);
        border: 1px solid var(--fhi-color-neutral-border-default);
        border-radius: 4px;
        display: grid;
        place-content: center;

        &:hover {
          background-color: var(--fhi-color-accent-background-subtle);
          border-color: var(--fhi-color-accent-border-strong);
        }

        &:active {
          background-color: var(--fhi-color-accent-surface-default);
          box-shadow: 0 0 0 5px var(--fhi-color-accent-surface-hover);
        }

        &:checked {
          background-color: var(--fhi-color-neutral-base-default);
          border-color: var(--fhi-color-neutral-base-default);

          &:hover {
            background-color: var(--fhi-color-accent-base-hover);
            border-color: var(--fhi-color-accent-base-hover);
          }
        }
      }

      input[type='checkbox']::before {
        content: '';
        width: 0.65rem;
        height: 0.65rem;
        transform: scale(0);
        transition: var(--fhi-motion-ease-default)
          var(--fhi-motion-duration-quick);

        background-image: url('data:image/svg+xml;utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"%3E%3Cpath d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" fill="white"/%3E%3C/svg%3E');
      }

      input[type='checkbox']:checked::before {
        transform: scale(1);
      }
    }

    :host([disabled]) {
      opacity: var(--fhi-opacity-disabled);

      * {
        cursor: not-allowed;
      }

      input {
        &:hover {
          background-color: var(--fhi-color-neutral-background-default);
          border-color: var(--fhi-color-neutral-border-default);
        }

        &:active {
          box-shadow: none;
          background-color: var(--fhi-color-neutral-background-default);
        }

        &:checked {
          background-color: var(--fhi-color-neutral-base-default);
          border-color: var(--fhi-color-neutral-base-default);
          &:hover {
            background-color: var(--fhi-color-neutral-base-default);
            border-color: var(--fhi-color-neutral-base-default);
          }
        }
      }
    }

    :host([status='error']:not([disabled])) {
      input[type='checkbox'] {
        background-color: var(--fhi-color-danger-background-default);
        border-color: var(--fhi-color-danger-border-default);

        &:hover {
          background-color: var(--fhi-color-danger-surface-default);
        }

        &:active {
          background-color: var(--fhi-color-danger-surface-default);
          box-shadow: 0 0 0 5px var(--fhi-color-danger-surface-hover);
        }

        &:checked {
          background-color: var(--fhi-color-danger-base-default);
          border-color: var(--fhi-color-danger-base-default);
          &:hover {
            background-color: var(--fhi-color-danger-base-hover);
            border-color: var(--fhi-color-danger-base-hover);
          }
        }
      }
    }
  `;
}
