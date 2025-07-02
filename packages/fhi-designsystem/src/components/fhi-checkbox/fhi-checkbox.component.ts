import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiCheckboxSelector = 'fhi-checkbox';

@customElement(FhiCheckboxSelector)
export class FhiCheckbox extends LitElement {
  @property({ type: String }) id = '';
  @property({ type: String }) label = '';
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
      --typography-font-family: var(--fhi-font-family-default);
      --opacity-disabled: var(--fhi-opacity-disabled);
      --color-text: var(--fhi-color-neutral-text-default);
      --typography-font-size: var(--fhi-typography-body-medium-font-size);
      --typography-font-weight: 400;
      --typography-line-height: var(--fhi-typography-body-medium-line-height);
      --typography-letter-spacing: var(
        --fhi-typography-body-medium-letter-spacing
      );
      --dimension-gap: var(--fhi-spacing-150);

      --color-checkbox: var(--fhi-color-neutral-background-default);
      --color-checkbox-border: var(--fhi-color-neutral-border-default);
      --color-checkbox-hover: var(--fhi-color-accent-background-subtle);
      --color-checkbox-border-hover: var(--fhi-color-accent-border-strong);
      --color-checkbox-active: var(--fhi-color-accent-surface-default);
      --checkbox-outline: solid 5px var(--fhi-color-accent-surface-hover);
      --color-checkbox-checked: var(--fhi-color-neutral-base-default);
      --color-checkbox-border-checked: var(--fhi-color-neutral-base-default);
      --color-checkbox-checked-hover: var(--fhi-color-accent-base-hover);
      --color-checkbox-border-checked-hover: var(--fhi-color-accent-base-hover);

      --color-checkbox-error: var(--fhi-color-danger-background-default);
      --color-checkbox-border-error: var(--fhi-color-danger-border-default);
      --color-checkbox-error-hover: var(--fhi-color-danger-background-subtle);
      --color-checkbox-border-error-hover: var(
        --fhi-color-danger-border-strong
      );
      --color-checkbox-error-active: var(--fhi-color-danger-surface-hover);
      --checkbox-outline-error: solid 5px var(--fhi-color-danger-surface-hover);
      --color-checkbox-error-checked: var(--fhi-color-danger-base-default);
      --color-checkbox-border-error-checked: var(
        --fhi-color-neutral-base-default
      );
      --color-checkbox-checked-error-hover: var(--fhi-color-danger-base-hover);
      --color-checkbox-border-checked-error-hover: var(
        --fhi-color-danger-base-hover
      );
      --color-checkbox-checked-error-active: var(
        --fhi-color-danger-base-active
      );
      --color-checkbox-border-checked-error-active: var(
        --fhi-color-danger-base-active
      );
      --motion-checkbox-transition: var(--fhi-motion-ease-default)
        var(--fhi-motion-duration-quick);
    }

    :host {
      label {
        color: var(--color-text);
        font-family: var(--typography-font-family);
        font-size: var(--typography-font-size);
        font-weight: var(--typography-font-weight);
        line-height: var(--typography-line-height);
        letter-spacing: var(--typography-letter-spacing);
        display: grid;
        grid-template-columns: 1rem auto;
        gap: var(--dimension-gap);
      }

      input[type='checkbox'] {
        appearance: none;
        width: 18px;
        height: 18px;
        background-color: var(--color-checkbox);
        border: 1px solid var(--color-checkbox-border);
        border-radius: 4px;
        flex-shrink: 0;
        aspect-ratio: 1/1;
        display: grid;
        place-content: center;

        &:hover {
          background-color: var(--color-checkbox-hover);
          border-color: var(--color-checkbox-border-hover);
        }

        &:active {
          background-color: var(--color-checkbox-active);
          outline: var(--checkbox-outline); // change token name
        }

        &:checked {
          background-color: var(--color-checkbox-checked);
          border-color: var(--color-checkbox-border-checked);

          &:hover {
            background-color: var(--color-checkbox-checked-hover);
            border-color: var(--color-checkbox-border-checked-hover);
          }
        }
      }

      input[type='checkbox']::before {
        content: '';
        width: 0.65rem;
        height: 0.65rem;
        transform: scale(0);
        transition: var(--motion-checkbox-transition);

        background-image: url('data:image/svg+xml;utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"%3E%3Cpath d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" fill="white"/%3E%3C/svg%3E');
      }

      input[type='checkbox']:checked::before {
        transform: scale(1);
      }
    }

    :host([disabled]) {
      opacity: var(--opacity-disabled);
      * {
        cursor: not-allowed;
      }

      input {
        &:hover {
          background-color: var(--color-checkbox);
          border-color: var(--color-checkbox-border);
        }

        &:active {
          outline: none;
        }

        &:checked:hover {
          background-color: var(--color-checkbox-checked-hover);
          border-color: var(--color-checkbox-border-checked-hover);
        }
      }
    }

    :host([status='error']:not([disabled])) {
      input[type='checkbox'] {
        background-color: var(--color-checkbox-error);
        border-color: var(--color-checkbox-border-error);

        &:hover {
          background-color: var(--color-checkbox-error-hover);
          border-color: var(--color-checkbox-border-error-hover);
        }

        &:active {
          background-color: var(--color-checkbox-error-active);
          outline: var(--checkbox-outline-error);
        }

        &:checked {
          background-color: var(--color-checkbox-error-checked);
          border-color: var(--color-checkbox-border-error);
          &:hover {
            background-color: var(--color-checkbox-checked-error-hover);
            border-color: var(--color-checkbox-border-checked-error-hover);
          }

          &:active {
            background-color: var(--color-checkbox-checked-error-active);
            border-color: var(--color-checkbox-border-checked-error-active);
          }
        }
      }
    }
  `;
}
